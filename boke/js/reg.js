$(document).ready(function()
{
	var reg = $("#reg");
	
	//对浏览器窗口调整大小
	$(window).resize(function () {
		$.resize(reg);
		if (reg.css('display') == 'block') //遮罩层布满页面
		{
			$.lock();
		}
	});
	
	$(".reg").click(function () 
	{
		reg.show().center(600,550);
		$.lock();
	});
	
	$("#reg .close").click(function () 
	{
		reg.hide();
		$.unlock();
	});
	//注册框拖拽
	reg.drag();
	$('#regForm').get(0).reset();
	$('#regForm :input[name=user]').focus(function(){
		$('#reg .info_user').css('display', 'block');
		$('#reg .error_user').css('display', 'none');
		$('#reg .succ_user').css('display', 'none');
	}).blur(function () {
		if ($.trim($(this).val()) == '') {
			$('#reg .info_user').css('display', 'none');
			$('#reg .error_user').css('display', 'none');
			$('#reg .succ_user').css('display', 'none');
		} else if (!check_user()) {
			$('#reg .error_user').css('display', 'block');
			$('#reg .info_user').css('display', 'none');
			$('#reg .succ_user').css('display', 'none');
		} else {
			$('#reg .succ_user').css('display', 'block');
			$('#reg .error_user').css('display', 'none');
			$('#reg .info_user').css('display', 'none');
		}
	}).keyup(function(){
		$(this).triggerHandler("blur");
	});
	function check_user() {
		var flag = true;
		if (!/[a-zA-Z0-9_]{2,20}/.test($.trim($('#regForm :input[name=user]').val()))){
			$('#reg .error_user').html('输入不合法，请重新输入！');
			return false;
		} else
		{
			$('#reg .loading').show();
			$('#reg .info_user').hide();
			$.ajax({
				url:"../checkuserByJSON.jsp",
				type:"POST",
				dataType:"json",
				data:{username:$('#regForm :input[name=user]').val()},
				success:function(data)
				{
					if(data.success){
						$('#reg .error_user').html('用户名被占用！');
						flag = false;
					}else{
						flag = true;
					}
					$('#reg .loading').hide();
				},
				async:false
			});
		}
		return flag;
	}
	
	//密码验证
	$('#regForm :password[name=pass]').focus(function(){
		$('#reg .info_pass').css('display', 'block');
		$('#reg .error_pass').css('display', 'none');
		$('#reg .succ_pass').css('display', 'none');
	}).blur(function(){
		if ($.trim($(this).val()) == '') {
			$('#reg .info_pass').css('display', 'none');
			$('#reg .error_pass').css('display', 'none');
			$('#reg .succ_pass').css('display', 'none');
		} 
		else
		{
			if (check_pass()) {
				$('#reg .info_pass').css('display', 'none');
				$('#reg .error_pass').css('display', 'none');
				$('#reg .succ_pass').css('display', 'block');
			} else {
				$('#reg .info_pass').css('display', 'none');
				$('#reg .error_pass').css('display', 'block');
				$('#reg .succ_pass').css('display', 'none');
			}
		}
	}).keyup(function(){
			check_pass();
	});
	function check_pass()
	{
			var value = $.trim($('#regForm :password[name=pass]').val());
			var value_length = value.length;
			var code_length = 0;
			//第一个必须条件的验证6-20位之间
			if (value_length >= 6 && value_length <= 20) {
				$('#reg .info_pass .q1').html('●').css('color', 'green');
			} else {
				$('#reg .info_pass .q1').html('○').css('color', '#666');
			}
			//第二个必须条件的验证，字母或数字或非空字符，任意一个即可
			if (value_length > 0 && !/\s/.test(value)) {
				$('#reg .info_pass .q2').html('●').css('color', 'green');
			} else {
				$('#reg .info_pass .q2').html('○').css('color', '#666');
			}
			//第三个必须条件的验证，大写字母，小写字母，数字，非空字符 任意两种混拼即可
			if (/[0-9]/.test(value)) {
				code_length++;
			}
			if (/[a-z]/.test(value)) {
				code_length++;
			}
			if (/[A-Z]/.test(value)) {
				code_length++;
			}
			if (/[^0-9a-zA-Z]/.test(value)) {
				code_length++;
			}
			if (code_length >= 2) {
				$('#reg .info_pass .q3').html('●').css('color', 'green');
			} else {
				$('#reg .info_pass .q3').html('○').css('color', '#666');
			}
			//安全级别
			if (value_length >= 10 && code_length >= 3) {
				$('#reg .info_pass .s1').css('color', 'green');
				$('#reg .info_pass .s2').css('color', 'green');
				$('#reg .info_pass .s3').css('color', 'green');
				$('#reg .info_pass .s4').html('高').css('color', 'green');
			} else if (value_length >= 8 && code_length >= 2) {
				$('#reg .info_pass .s1').css('color', '#f60');
				$('#reg .info_pass .s2').css('color', '#f60');
				$('#reg .info_pass .s3').css('color', '#ccc');
				$('#reg .info_pass .s4').html('中').css('color', '#f60');
			} else if (value_length >= 1) {
				$('#reg .info_pass .s1').css('color', 'maroon');
				$('#reg .info_pass .s2').css('color', '#ccc');
				$('#reg .info_pass .s3').css('color', '#ccc');
				$('#reg .info_pass .s4').html('低').css('color', 'maroon');
			} else {
				$('#reg .info_pass .s1').css('color', '#ccc');
				$('#reg .info_pass .s2').css('color', '#ccc');
				$('#reg .info_pass .s3').css('color', '#ccc');
				$('#reg .info_pass .s4').html(' ');
			}	
			if (value_length >= 6 && value_length <= 20 ) {//&& !/\s/.test(value) && code_length >= 2
				return true;
			} else {
				return false;
			}
	}
	
	
	
	//密码确认
	$('#regForm :password[name=notpass]').focus(function(){
		$('#reg .info_notpass').css('display', 'block');
		$('#reg .error_notpass').css('display', 'none');
		$('#reg .succ_notpass').css('display', 'none');
	}).blur(function () {
		if ($.trim($(this).val()) == '') {
			$('#reg .info_notpass').css('display', 'none');
		} else if ($.trim($(this).val()) == $.trim($('#regForm :password:eq(0)').val())){
			$('#reg .info_notpass').css('display', 'none');
			$('#reg .error_notpass').css('display', 'none');
			$('#reg .succ_notpass').css('display', 'block');
		} else {
			$('#reg .info_notpass').css('display', 'none');
			$('#reg .error_notpass').css('display', 'block');
			$('#reg .succ_notpass').css('display', 'none');
		}
	});
	function check_notpass() {
		if ($.trim($('#regForm :password[name=notpass]').val()) == $.trim($('#regForm :password:eq(0)').val())) return true;
	}
	
	//提问
	$('#regForm :input[name=ques]').change( function () {
		if (check_ques()) $('#reg .error_ques').css('display', 'none');
	});
	function check_ques() {
		if ($('#regForm :input[name=ques]').val() != 0) return true;
	}
	
	//回答
	$('#regForm :input[name=ans]').focus( function () {
		$('#reg .info_ans').css('display', 'block');
		$('#reg .error_ans').css('display', 'none');
		$('#reg .succ_ans').css('display', 'none');
	}).blur( function () {
		if ($.trim($(this).val()) == '') {
			$('#reg .info_ans').css('display', 'none');
		} else if ($.trim($(this).val()).length >= 2 && $.trim($(this).val()).length <= 32) {
			$('#reg .info_ans').css('display', 'none');
			$('#reg .error_ans').css('display', 'none');
			$('#reg .succ_ans').css('display', 'block');
		} else {
			$('#reg .info_ans').css('display', 'none');
			$('#reg .error_ans').css('display', 'block');
			$('#reg .succ_ans').css('display', 'none');
		}
	}).keyup(function(){
			$(this).triggerHandler("blur");
	});
	function check_ans() {
		if ($('#regForm :input[name=ans]').val().length >= 2 && $('#regForm :input[name=ans]').val().length <= 32) return true;
	}
	
	//电子邮件
	$('#regForm :input[name=email]').focus( function () {
		//补全界面
		if ($.trim($(this).val()) .indexOf('@') == -1) $('#reg .all_email').css('display', 'block');
		
		$('#reg .info_email').css('display', 'block');
		$('#reg .error_email').css('display', 'none');
		$('#reg .succ_email').css('display', 'none');
	}).blur( function () {
		//补全界面
		$('#reg .all_email').css('display', 'none');
		
		if ($.trim($(this).val()) == '') {
			$('#reg .info_email').css('display', 'none');
		} else if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test($.trim($(this).val()))) {
			$('#reg .info_email').css('display', 'none');
			$('#reg .error_email').css('display', 'none');
			$('#reg .succ_email').css('display', 'block');
		} else {
			$('#reg .info_email').css('display', 'none');
			$('#reg .error_email').css('display', 'block');
			$('#reg .succ_email').css('display', 'none');
		}
	}).keyup(function(event){//电子邮件补全系统键入
			if ($.trim($(this).val()).indexOf('@') == -1) {
				$('#reg .all_email').css('display', 'block');
				$('#reg .all_email li span').text($.trim($(this).val()));
			} else {
				$('#reg .all_email').css('display', 'none');
			}
			//每次键入都把原有选中效果消除
			$('#reg .all_email li').css('background', 'none');
			$('#reg .all_email li').css('color', '#666');
			//向下键Down
			if (event.keyCode == 40) {
				if (this.index == undefined || this.index >= $('#reg .all_email li').size() - 1) {
					this.index = 0;
				} else {
					this.index++;
				}
				$('#reg .all_email li').eq(this.index).css('background', '#e5edf2');
				$('#reg .all_email li').eq(this.index).css('color', '#369');
			}
			//向上键Up
			if (event.keyCode == 38) {
				if (this.index == undefined || this.index <= 0) {
					this.index = $('#reg .all_email li').size() - 1;
				} else {
					this.index--;
				}
				$('#reg .all_email li').eq(this.index).css('background', '#e5edf2');
				$('#reg .all_email li').eq(this.index).css('color', '#369');
			}
			//回车键
			if (event.keyCode == 13) {
				$(this).attr("value",$('#reg .all_email li').eq(this.index).text());
				$('#reg .all_email').css('display', 'none');
				this.index = undefined;
			}
	});
	
	//电子邮件补全系统鼠标移入移出效果
	$('#reg .all_email li').hover(function () {
		$(this).css('background', '#e5edf2');
		$(this).css('color', '#369');
	}, function () {
		$(this).css('background', 'none');
		$(this).css('color', '#666');
	});
	
	//电子邮件补全系统点击获取
	$('#reg .all_email li').mousedown( function () {
		$('#regForm :input[name=email]').attr("value",$(this).text());
	});
	function check_email() {
		if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test($.trim($('#regForm :input[name=email]').val()))) return true;
	}
	
	
	//年月日
	var year = $('#regForm :input[name=year]');
	var month = $('#regForm :input[name=month]');
	var day = $('#regForm :input[name=day]');
	
	var day30 = [4, 6, 9, 11];
	var day31 = [1, 3, 5, 7, 8, 10, 12];
	
	//注入年
	for (var i = 1950; i <= new Date().getFullYear(); i ++) {
		year.append("<option value="+i +">"+i +"</option>");
	}
	//注入月
	for (var i = 1; i <= 12; i ++) {
		month.append("<option value="+i +">"+i +"</option>");
	}
	
	year.bind('change', select_day);
	month.bind('change', select_day);
	
	function select_day() {
		if (year.val() != -1 && month.val() != -1) {
			//清理之前的注入
			day.empty().append("<option value='-1'>- 请选择 -</option>");
			//不确定的日
			var cur_day = 0;
			//注入日
			if ($.inArray(parseInt(month.val()),day31 )!= -1) {
				cur_day = 31;
			} else if ($.inArray(parseInt(month.val()),day30) != -1) {
				cur_day = 30;
			} else {
				if ((parseInt(year.val()) % 4 == 0 && parseInt(year.val()) % 100 != 0) || parseInt(year.val()) % 400 == 0) {
					cur_day = 29;
				} else {
					cur_day = 28;
				}
			}
			for (var i = 1; i <= cur_day; i ++) {
				day.append("<option value="+i +">"+i +"</option>");
			}
		} else {
			//清理之前的注入
			day.empty().append("<option value='-1'>- 请选择 -</option>");
		}
	}
	
	//备注
	var ps = $('#regForm :input[name=ps]');
	ps.keyup(check_ps).bind('paste', function () {
		//粘贴事件会在内容粘贴到文本框之前触发
		setTimeout(check_ps, 50);
	});
	
	//清尾
	$('#reg .ps .clear').click(function () {
		ps.attr("value",ps.val().substring(0,200));
		check_ps();
	});
	
	function check_ps() {
		var num = 200 - ps.val().length;
		if (num >= 0) {
			$('#reg .ps').eq(0).css('display', 'block');
			$('#reg .ps .num').eq(0).html(num);
			$('#reg .ps').eq(1).css('display', 'none');
		} else {
			$('#reg .ps').eq(0).css('display', 'none');
			$('#reg .ps .num').eq(1).html(Math.abs(num)).css('color', 'red');
			$('#reg .ps').eq(1).css('display', 'block');
		}
	}
	//提交
	$('#regForm :input[name=sub]').click(function () {
		var flag = true;
		if (!check_user()) {
			$('#reg .error_user').css('display', 'block');
			flag = false;
		}
		if (!check_pass()) {
			$('#reg .error_pass').css('display', 'block');
			flag = false;
		}
		if (!check_notpass()) {
			$('#reg .error_notpass').css('display', 'block');
			flag = false;
		}
		if (!check_ques()) {
			$('#reg .error_ques').css('display', 'block');
			flag = false;
		}
		if (!check_ans()) {
			$('#reg .error_ans').css('display', 'block');
			flag = false;
		}
		if (!check_email()) {
			$('#reg .error_email').css('display', 'block');
			flag = false;
		}
		if (flag) {
			var _this = this;
			$('#loading').show().center(200, 40);
			$('#loading p').html('正在提交注册中...');
			_this.disabled = true;
			alert($(this).css("backgroundPosition"));
			$(_this).css('backgroundPosition', 'right');
			$.ajax({
					type: "POST",
					url: "../registerDataHandler.jsp",
					dataType: "JSON",
					data: $("#regForm").serialize(),
					success: function(data){
						$('#loading').hide();
						$('#success').show().center(200, 40);
						$('#success p').html('注册成功，请登录...');
						setTimeout(function () {//显示1.5秒后自动消失
							$('#success').hide();
							reg.hide();
							$('#reg .succ').hide();
							$('#regForm').get(0).reset();
							_this.disabled = false;
							$(_this).css('backgroundPosition', 'left');
							$.unlock();
						}, 1500);	
					}
			});             
		}
	});
});
