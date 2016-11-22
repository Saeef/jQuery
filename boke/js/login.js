$(document).ready(function()
{
	var login = $("#login");
	
	$(window).resize(function () {
		$.resize(login);
		if (login.css('display') == 'block') //遮罩层布满页面
		{
			$.lock();
		}
	});
	
	$(".login").click(function () 
	{
		login.show().center(350,250);//展现登陆框
		$.lock();
	});
	
	$("#login .close").click(function () 
	{
		login.hide();//隐藏登陆框
		$.unlock();
	});
	
	//登陆框的拖拽功能
	login.drag();
	$('#loginForm :input[name=sub]').click(function(){
		var _this = this;
		$('#loading').show().center(200, 40);
		$('#loading p').html('正在尝试登录...');
		_this.disabled = true;
		$(_this).css("backgroundPosition","right")
		$.ajax({
					type: "POST",
					url: "../loginDataHandler.jsp",
					dataType: "JSON",
					data: $("#loginForm").serialize(),
					success: function(data){
						$('#loading').hide();
						if(data.msg =="0")
						{
							$('#login .info').html('登录失败：用户名或密码不正确！');
						}
						else{
							$('#success').show().center(200, 40);
							$('#success p').html('登录成功，请稍后...');
							setTimeout(function () {//显示1.5秒后自动消失
								$('#success').hide();
								login.hide();
								$.unlock();
								$('#header .reg').css('display', 'none');
								$('#header .login').css('display', 'none');
								$('#header .info').css('display', 'block').html($('#loginForm :input[name=user]').first().val() + '，您好！');
								$('#loginForm').get(0).reset();
							}, 1500);	
						}
						_this.disabled = false;
						$(_this).css('backgroundPosition', 'left');
					}
			});             
	});
});
