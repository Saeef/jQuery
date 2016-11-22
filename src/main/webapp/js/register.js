// /////////////////////////////////////////////////////////
function checkUserByAjaxGet() 
{
	// 第一步，得到一个XMLHttpRequest对象
	// var xhr=new XMLHttpRequest();
	// 如果说IE6，就需要使用Active组建
	// xmlhttp=new ActiveXObject(MSXML[n]);
	var xhr = creatXmlHttpRequest();
	var name = document.rgform.username.value;
	// 设置一个事件的监听函数
	xhr.onreadystatechange = function() 
	{
		if (xhr.readyState == 4) 
		{
			if (xhr.status == 200 || xhr.status == 304) 
			{
				var ret = xhr.responseText;
				var _ret = eval('(' + ret + ')'); 
//				var _ret = JSON.parse(ret);
				document.getElementById("msg").innerHTML = _ret.tip;
				if (_ret.success = true) 
				{
					document.rgform.username.focus();
				}
			}
		}
	}
	// 第二步，准备一个连接请求
	xhr.open("get", "checkuserByJSON.jsp?name=" + name, true);
	// 第三步，发起请求
	xhr.send(null);
	// 第四步，获取结果
}
// /////////////////////////////////////////////////////
function checkUserByAjaxPost() 
{
	// 第一步,创建xhr对象
	var xhr = creatXmlHttpRequest();
	var name = document.rgform.username.value;
	// 第二步,设置一个事件的监听函数
	xhr.onreadystatechange = function() 
	{
		if (xhr.readyState == 4) 
		{
			if (xhr.status == 200 || xhr.status == 304) 
			{
				var ret = xhr.responseText;
				var _ret = eval('(' + ret + ')'); 
//				var _ret = JSON.parse(ret);
				document.getElementById("msg").innerHTML = _ret.tip;
				if (_ret.success = true) 
				{
					document.rgform.username.focus();
					alert(xhr.getResponseHeader("Content-Length"));
					alert(xhr.getResponseHeader("Content-Type"));
					alert(xhr.getResponseHeader("Date"));
					alert(xhr.getResponseHeader("Server"));
				}
			}
		}
	}
	// 第三步,准备一个POST连接请求
	xhr.open("post", "checkuserByJSON.jsp", true);
	// 使用post方式提交，必须要加上如下一行
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	// 第四步,发起请求
	xhr.send("name=" + name + "&password=ppppp");
}
// ////////////////////////////////////////////////////
function checkUserByAjaxPostXml() {
	// 第一步,创建xhr对象
	var xhr = creatXmlHttpRequest();
	var name = document.rgform.username.value;
	// 第二步,设置一个事件的监听函数
	xhr.onreadystatechange = function() 
	{
		if (xhr.readyState == 4) 
		{
			if (xhr.status == 200 || xhr.status == 304) 
			{
				var ret = xhr.responseXML;
				var successNode = ret.getElementsByTagName("success")[0];
				var tipNode = ret.getElementsByTagName("tip")[0];
				document.getElementById("msg").innerHTML = tipNode.firstChild.nodeValue;
				if (successNode.firstChild.nodeValue == true) 
				{
					document.rgform.username.focus();
				}
			}
		}
	}
	// 第三步,准备一个POST连接请求
	xhr.open("post", "checkuserByXML.jsp", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	// 第四步,发起请求
	xhr.send("name=" + name + "&password=ppppp");
}

function creatXmlHttpRequest() 
{
	if (typeof XMLHttpRequest != 'undefined')
	{
		return new XMLHttpRequest();
	}
	else if (typeof ActiveXObject != 'undefined')
	{
		var MSXML = ['MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.5.0',
				'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP',
				'Microsoft.XMLHTTP'];
		for (var i = 0; MSXML.length; i ++)
		{
			try{
				return new ActiveXObject(version[i]);
			}catch (e)
			{
				//.......
			}
		}
	}
	else
	{
		throw new Error('您的系统或浏览器不支持XHR对象！');
	}
}
// ////////////////////////////////////////////////////
//名值对转换为字符串
function params(data) {
	var arr = [];
	for (var i in data) {
		arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
	}
	return arr.join('&');
}
//封装ajax
function ajax(obj) {
	var xhr = creatXmlHttpRequest();
	obj.url = obj.url + '?rand=' + Math.random();
	obj.data = params(obj.data);
	if (obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
	if (obj.async === true) {
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				callback();
			}
		};
	}
	xhr.open(obj.method, obj.url, obj.async);
	if (obj.method === 'post') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(obj.data);	
	} else {
		xhr.send(null);
	}
	if (obj.async === false) {
		callback();
	}
	function callback() {
		if (xhr.status == 200) {
			obj.success(xhr.responseText);			//回调传递参数
		} else {
			alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
		}	
	}
}
window.onload = function(){
	document.getElementById("username").onchange = function(){
		ajax({
			method : 'post',
			url : 'checkuserByJSON.jsp',
			data : {
				'username' : document.rgform.username.value,
				'password' : document.rgform.password.value
			},
			success : function (text) {
					var _ret = eval('(' + text + ')'); 
					document.getElementById("msg").innerHTML = _ret.tip;
			},
			async : true
		});
	}
}
