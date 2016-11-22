$(function(){
		
		//轮播器初始化
		var len = $("#banner img").length; 
		var ul = "<ul>";
		for(var i=0; i < len; i++){ul += "<li>●</li>";}
		ul += "</ul>";
		$(ul).appendTo($("#banner"));
		$('#banner img').css("opacity",0).css("filter",'alpha(opacity=' + (0*100) + ')');
		$('#banner img').eq(0).css("opacity",1).css("filter",'alpha(opacity=' + (1*100) + ')');
		$('#banner ul li').eq(0).css('color', '#333');
		$('#banner strong').html($('#banner img').eq(0).attr('alt'));
		
		//轮播器计数器
		var banner_index = 0;
		//轮播器的种类
		var banner_type = 2; 		//1表示左右，2表示上下滚动
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
		
});