$(document).ready(function(){
	//预加载
	var photo_big = $("#photo_big");
	//对浏览器窗口调整大小
	$(window).resize(function () {
		$.resize(photo_big);
		if (photo_big.css('display') == 'block') //遮罩层布满页面
		{
			$.lock();
		}
	});
	//弹出框拖拽
	photo_big.drag();
	//弹出照片框
	$("#photo dl dt img").click(function () 
	{
		photo_big.show().center(620,511);
		$.lock();
		var temp_img = new Image();
		$(temp_img).load(function(){
			$('#photo_big .big img').attr('src', temp_img.src).animate({opacity : '1'}).
			css('width', '600px').css('height', '450px').css('top', 0).opacity(0);
		});
		temp_img.src = $(this).attr('bigsrc');
		var children = $(this).parent().parent();
		prev_next_img(children);
	});
	//关闭|隐藏
	$("#photo_big .close").click(function () 
	{
		photo_big.hide();
		$.unlock();
		$('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
	});
	//图片鼠标划过
	$('#photo_big .big .left').hover(function(){
		$('#photo_big .big .sl').animate({opacity:'0.5'},500);
	},function(){
		$('#photo_big .big .sl').animate({opacity:'0'},500);
	});
	$('#photo_big .big .right').hover(function(){
		$('#photo_big .big .sr').animate({opacity:'0.5'},500);
	},function(){
		$('#photo_big .big .sr').animate({opacity:'0'},500);
	});
	//图片上一张
	$('#photo_big .big .left').click(function(){
		$('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
		var current_img = new Image();
		$(current_img).load(function(){
			$('#photo_big .big img').attr('src', current_img.src).animate({opacity:'1'}).opacity(0).
			css('width', '600px').css('height', '450px').css('top', 0);
		});
		current_img.src = $(this).attr('src');
		//获取<dl>
		var children = $('#photo dl dt img').eq(prevIndex($('#photo_big .big img').attr('index'), $('#photo'))).parent().parent();
		prev_next_img(children);
	});
	//图片下一张
	$('#photo_big .big .right').click(function(){
		$('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
		var current_img = new Image();
		$(current_img).load(function(){
			$('#photo_big .big img').attr('src', current_img.src).animate({opacity:'1'}).opacity(0).
			css('width', '600px').css('height', '450px').css('top', 0);
		});
		current_img.src = $(this).attr('src');
		//获取<dl>
		var children = $('#photo dl dt img').eq(nextIndex($('#photo_big .big img').attr('index'), $('#photo'))).parent().parent();
		prev_next_img(children);
	});
	
	//获取某一个节点的上一个节点的索引
	function prevIndex(current, parent) {
		var length = parent.children().size();
		if (current == 0) return length - 1;
		return parseInt(current) - 1;
	}
	
	//获取某一个节点的下一个节点的索引
	function nextIndex(current, parent) {
		var length = parent.children().size();
		if (current == length - 1) return 0;
		return parseInt(current) + 1;
	}
	function prev_next_img(children) {
		var prev = prevIndex(children.index(), children.parent());
		var next = nextIndex(children.index(), children.parent());
		
		var prev_img = new Image();
		var next_img = new Image();
		
		prev_img.src = $('#photo dl dt img').eq(prev).attr('bigsrc');
		next_img.src = $('#photo dl dt img').eq(next).attr('bigsrc');
		$('#photo_big .big .left').attr('src', prev_img.src);
		$('#photo_big .big .right').attr('src', next_img.src);
		$('#photo_big .big img').attr('index', children.index());
		$('#photo_big .big .index').html(parseInt(children.index()) + 1 + '/' + $('#photo dl dt img').size());
	}
});

		