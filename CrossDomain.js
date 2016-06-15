//script tag request cross domain
//php response : ‘fn('+$json+')'
var script = document.createElement('script')
script.src = 'http://wwww.example.com/test.php?fn=fn'
function fn(data) {
    console.log(data)
}

// 1、请求外部api会遇到跨域问题.这里有个小办法跨域进行解决
$.ajax({
    url:url,// 外部api请求
    type:"GET",
    dataType:"jsonp", // 加上类型sjonp即可
    success:function(data){
        // do something
    },
    error:function(){
        //do something
    }
});

// 2、通过修改document.domain来跨子域
// 错误案例:
function onLoad_err(){
    var iframe = document.getElementById('iframe');
    var win = iframe.contentWindow; // 这里能获取到iframe里的window对象,但该window对象的属性和方法几乎是不可用的
    var doc = win.document          // 这里是获取不到iframe的document对象的
    var name = win.name             // 这里同样是获取不到window对象的name属性的
}
// 这个时候document.domain就可以派上用场了
document.domain = 'example.com';// 设置成主域
function onLoad_right(){
    alert(document.getElementById('iframe').contentWindow);
}

// 3、使用window.name来进行跨域
//...


// 4、使用HTML5中新引进的window.postMessage方法来跨域传送数据
// 页面 http://test.com/a.html
function a_onload(){
    var iframe = document.getElementById('iframe');
    var win = iframe.contentWindow;         // 获取window对象
    win.postMessage('来自a页面的消息','*'); // 向不同域的b页面http://test.com/b.html发送消息
}
// 页面 http://test.com/b.html
window.onmessage = function(e){     // 注册message事件用来接收消息
    e = e || event;                 // 获取事件对象
    alert(e.data);                  // 通过data属性得到传送的消息
}

// we can also use post method to make a cross domain request
$.ajax({
    type: 'POST',
    url: 'https://to.com/postHere.php',
    crossDomain: true,
    data: '{"some":"json"}',
    dataType: 'json',
    success: function(responseData, textStatus, jqXHR) {
        var value = responseData.someKey;
    },
    error: function (responseData, textStatus, errorThrown) {
        alert('POST failed.');
    }
});
/*When you do the POST in step 2, your browser will send a "OPTIONS" method to the server. This is a "sniff" by the browser to see if the server is cool with you POSTing to it. The server responds with an "Access-Control-Allow-Origin" telling the browser its OK to POST|GET|ORIGIN if request originated from "http://from.com" or "https://from.com". Since the server is OK with it, the browser will make a 2nd request (this time a POST). It is good practice to have your client set the content type it is sending - so you'll need to allow that as well.

MDN has a great write-up about HTTP access control, that goes into detail of how the entire flow works. According to their docs, it should "work in browsers that support cross-site XMLHttpRequest". This is a bit misleading however, as I THINK only modern browsers allow cross domain POST. I have only verified this works with safari,chrome,FF 3.6.

Keep in mind the following if you do this:

Your server will have to handle 2 requests per operation
You will have to think about the security implications. Be careful before doing something like 'Access-Control-Allow-Origin: *'
This wont work on mobile browsers. In my experience they do not allow cross domain POST at all. I've tested android, iPad, iPhone
There is a pretty big bug in FF < 3.6 where if the server returns a non 400 response code AND there is a response body (validation errors for example), FF 3.6 wont get the response body. This is a huge pain in the ass, since you cant use good REST practices. See bug here (its filed under jQuery, but my guess is its a FF bug - seems to be fixed in FF4).
Always return the headers above, not just on OPTION requests. FF needs it in the response from the POST.
*/
