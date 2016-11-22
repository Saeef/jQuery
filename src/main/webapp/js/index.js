$(document).ready(function()
{
	jQuery.fn.extend({
		//阻止输入非数字 
		preventNumeric:function(){
			return $(this).keydown(function(event){
				var keyCode = event.which;  
				if (keyCode == 8 || keyCode == 9 || keyCode == 46 || (keyCode >= 48 && keyCode <=57))  
				return true;  
			 	else  
				return false;  
			}).focus(function(){
				this.style.imeMode='disabled'; 
			});
		},
		//冒泡框提示
		tip:function(msg){
			var $tar = $(this);
			return $(this).hover(function(e){
				$("<div id='bubble'></div>").appendTo($tar).
					append("<div class='bubble_top'></div><div class='bubble_middle'></div><div class='bubble_bottom'></div>");
				$("<span></span").appendTo($(".bubble_middle")).html(msg);
				$("#bubble").css("left",e.clientX-100).css("top",e.clientY+$(window).scrollTop()-$("#bubble").height()).show();
			},function(){
				$("#bubble").remove();
			});
		},
		//拖拽功能
		drag:function(){
			var $tar = $(this);
			return $(this).mousedown(function(e){
				if(e.target.tagName =="H2"){
					var diffX = e.clientX - $tar.offset().left;
					var diffY = e.clientY - $tar.offset().top;
					$(document).mousemove(function(e){
						var left = e.clientX - diffX;
						var top = e.clientY - diffY;
						if (left < 0){
							left = 0;
						}
						else if (left <= $(window).scrollLeft()){
							left = $(window).scrollLeft();
						}
						else if (left > $(window).width() +$(window).scrollLeft() - $tar.width()){
							left = $(window).width() +$(window).scrollLeft() -$tar.width();
						}
						if (top < 0){
							top = 0;
						}
						else if (top <= $(window).scrollTop()){
							top = $(window).scrollTop();
						}
						else if (top > $(window).height() +$(window).scrollTop() - $tar.height()){
							top = $(window).height() +$(window).scrollTop() - $tar.height();
						}
						$tar.css("left",left + 'px').css("top",top + 'px');
					});
				}
				$(document).mouseup(function(){
					$(this).unbind("mousemove");
					$(this).unbind("mouseup")
				});
			});
		},
		opacity:function(num)
		{
			return $(this).css("opacity",num).css("filter",'alpha(opacity=' + (num*100) + ')');
		},
		center:function(width,height)
		{
			return $(this).css("left", ($(window).width()-width)/2+$(window).scrollLeft()).
			css("top", ($(window).height()-height)/2+$(window).scrollTop()).
			css("width",width).
			css("height",height);
		}
		});
		
		jQuery.extend({
			//对浏览器窗口调整大小的同时影响到的对象也同步进行调整
			resize:function(obj)
			{
				if( obj.offset().left>$(window).width()+$(window).scrollLeft()-obj.width())
				{
					obj.css("left",$(window).width()+$(window).scrollLeft()-obj.width()+"px");
					if( obj.offset().left<$(window).scrollLeft())
					{
						obj.css("left",$(window).scrollLeft()+"px");
					}
				}
				if( obj.offset().top>$(window).height()+$(window).scrollTop()-obj.height())
				{
					obj.css("top",$(window).height()+$(window).scrollTop()-obj.height()+"px");
					if( obj.offset().top<$(window).scrollTop())
					{
						obj.css("top",$(window).scrollTop()+"px");
					}
				}
			},
			getParameter:function(id)
			{
				var args = [];
				var qs = location.search.length > 0 ? location.search.substring(1) : '';
				var items = qs.split('&');
				var item = null, name = null, value = null;
				
				for (var i = 0; i < items.length; i++) {
					item = items[i].split('=');
					name = item[0];
					value = item[1]
					args[name] = value;
				} 
				return args[id];
			},
			screen:$("<div id='screen'></div>").appendTo("body"),
			lock:function(){
				  this.screen.css("height", $(window).height()+$(window).scrollTop()).
				  css("width", $(window).width()+$(window).scrollLeft()).show().animate({opacity:'0.3'},500);
				  /*document.body.style.overflow = 'hidden';//禁止滚动条*/				  
				  $.browser.version < 4 ? document.body.style.overflow = 'hidden' : document.documentElement.style.overflow = 'hidden';
				  this.screen.mousedown(function(e){e.preventDefault();});
				  this.screen.mouseup(function(e){e.preventDefault();});
			},
			unlock:function(){
				 this.screen.animate({opacity:'0'},500,function(){
				 	$(this).hide();
				 });
				 /*document.body.style.overflow = 'auto';//还原默认滚动条*/				 
				 $.browser.version < 4 ? document.body.style.overflow = 'auto' : document.documentElement.style.overflow = 'auto';
				 this.screen.unbind("mousedown");
				 this.screen.unbind("mouseup");
		}});
		
		$(".member").hover(function(){
			$(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
			$(".member_ul").show().animate({opacity:'1',height:'120px'},500);
		},function(){
			$(this).css('background', 'url(images/arrow.png) no-repeat 55px center');
			$(".member_ul").animate({opacity:'0',height:'0px'},500,function(){
				 	$(this).hide();
			 });
		});
		
		//滑动导航
		$('#nav ul.about>li').hover(function(){
			var target = $(this).position().left;
			$('#nav div.nav_bg').animate({left:(target+20)+"px"},100,function()
			{
				$('#nav div.nav_bg ul.white').css("left","-"+target+"px");
			});
		});
		//左侧菜单
		/*$('#sidebar h2').each(function(){
			$(this).toggle(function(){
				$(this).next().animate({opacity:'0',height:'0px'},500);
			},function(){
				$(this).next().animate({opacity:'1',height:'150px'},500);
			});
		});*/
		$('#sidebar h2').toggle(function(){
			$(this).next().animate({opacity:'0',height:'0px'},500);
		},function(){
			$(this).next().animate({opacity:'1',height:'150px'},500);
		});
		
		//百度分享初始化位置
		$('#share').css('top',  $(window).scrollTop() +($(window).height()-$('#share').height())/2+ 'px');
		//百度分享收缩效果
		$('#share').hover(function () {
			$(this).stop(true,false).animate({left:"0px"},1000);
		}, function () {
			$(this).stop(true,false).animate({left:"-211px"},1000);
		});
		$(window).scroll(function(){
			$('#share').stop(true,false).animate({top:$(window).scrollTop() +($(window).height()-$('#share').height())/2 + 'px'},100);
		});
		
		//轮播器初始化
		var len = $("#banner img").length; 
		var ul = "<ul>";
		for(var i=0; i < len; i++){ul += "<li>●</li>";}
		ul += "</ul>";
		$(ul).appendTo($("#banner"));
		$('#banner img').opacity(0);
		$('#banner img').eq(0).opacity(1);
		$('#banner ul li').eq(0).css('color', '#333');
		$('#banner strong').html($('#banner img').eq(0).attr('alt'));
		
		//轮播器计数器
		var banner_index = 0;
		//轮播器的种类
		var banner_type = 2; 		//1表示透明度，2表示上下滚动
		//自动轮播器
		var banner_timer = setInterval(banner_fn, 4000);
		//手动轮播器
		$('#banner ul li').hover(function () {
			clearInterval(banner_timer);
			if ($(this).css('color') != 'rgb(51, 51, 51)' && $(this).css('color') != '#333') {
				banner(this, banner_index == 0 ? $('#banner ul li').size() - 1 : banner_index - 1);
			}
		}, function () {
			banner_index = $(this).index() + 1;
			banner_timer = setInterval(banner_fn, 3000);
		});
		function banner(obj, prev) {
			$('#banner ul li').css('color', '#999');
			$(obj).css('color', '#333');
			$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
			
			if (banner_type == 1) 
			{
				$('#banner img').eq(prev).animate({
					opacity : '0',
					left:"-900px"
				},1500).css('z-index', 1);
				
				$('#banner img').eq($(obj).index()).animate({
					opacity : '1',
					left:"0"
				},1500).css('z-index', 2);
			}
			else if (banner_type == 2) 
			{
				$('#banner img').eq(prev).animate({
					opacity : '0',
					top : '150px'
				},1500).css('z-index', 1);
				
				$('#banner img').eq($(obj).index()).animate({
					opacity : '1',
					top : '0'
				},1500).css('z-index', 2);
			}
		}
		
		function banner_fn() {
			if (banner_index >= $('#banner ul li').size()) 
				banner_index = 0;
			banner($('#banner ul li').eq(banner_index), 
															banner_index == 0 ? $('#banner ul li').size() - 1 : banner_index - 1);
			banner_index++;
		}
		//延迟加载
		$('.wait_load').opacity(0);
		$(window).scroll(function () {
			setTimeout(function () {
				$('.wait_load').each(function(){
					if ($(window).height() + $(window).scrollTop() >= $(this).offset().top) {
						$(this).attr('src', $(this).attr('xsrc')).animate({opacity:'1'});
					}
				});
			}, 1000);
		});
		$("#footer span").first().html("Copyright &copy; 2013-"+new Date().getFullYear());
		$("#footer span a:eq(0)").tip("文字文字文字文字文文字文字文字文字文字文字文字文字文字文字文字文字文字");
});
