$(function() {
	$(".banner").flexslider({
		namespace: "banner-",
		animation: "slide",
		slideshowSpeed: 3000, //展示时间间隔ms
		// animationSpeed: 400, //滚动时间ms
		directionNav: true,
		touch: true, //是否支持触屏滑动
		pauseOnHover: true,
		parseOnAction: false
	});
	initLi();
	$(".leftp").on('click', function(event) {
		envirLeft();
	});
	$(".rightp").on('click', function(event) {
		envirRight();
	});
	$(".sider-ul").find('img').each(function(index, el) {
		$(this).addClass('transition');
	});
	// $(".sider-ul").children('li').mouseenter(function(event) {
	// 	$(this).addClass('active');
	// });
	// $(".sider-ul").children('li').mouseleave(function(event) {
	// 	$(this).removeClass('active');
	// });
	


	// //首页新闻加载具体内容
	$.ajax({
		url: "http://www.vipyyzh.com:1080/kangmei/news/selectNewsByRand",
		type: "GET",
		data: null,
		dataType: "JSON",
		success: function(data){

			for(var i=0;i<data.length;i++){
				$(".sider-ul li:last-child").find("a").attr("href", "news-detail.html?" + data[i].id + "&" + data[i].newsclass);
				$(".sider-ul li:last-child").find("img").attr("src",data[i].url);
				$(".sider-ul li:last-child").find(".title").text(data[i].title);
				$(".sider-ul li:last-child").find(".syn").text(data[i].content);
				$(".sider-ul li:last-child").find(".time").text(data[i].time);

				$(".sider-ul").append($(".sider-ul li:last-child").clone(true));
			}

			// $(".sider-ul li:last-child").remove();
		},
		error: function(){
			$(".sider-ul li").text("公司动态加载失败!!!");
		}
	});

});

function initLi(argument) {
	$(".sider-ul").children('li').eq(0).addClass('fir-li');
	$(".sider-ul").children('li').eq(2).addClass('las-li');
	$(".sider-ul").children('li').each(function(index, el) {
		if (index>=3) {$(this).css('display', 'none');}
	});
	$(".sider-ul").children('li').each(function(index, el) {
		if (index==0) {$(this).css('left', '10px');}
			else {$(this).css('left', (index*370+10)+'px');}
	});
}
function clrLi(argument) {
	$(".sider-ul").children('.fir-li').removeClass('fir-li');
	$(".sider-ul").children('.las-li').removeClass('las-li');
}
function envirLeft() {
	$(".leftp").off();
	var $li=$('.sider-ul>li');
	var num=$('.sider-ul>li').length;
	if (num<=2) {return false;}
	var $new=$li.first().clone(true,true);
	var l=$li.length*370+10;
	$new.removeClass().css({
		'left': l+'px',
		'display': "none"
	});
	$(".sider-ul").append($new);
	$(".las-li").next().fadeIn('300', function() {});
	setTimeout(function () {
		$(".fir-li").fadeOut('300', function() {});
	})
	$('.sider-ul').animate({
		left: -370+'px'
		},
		'300', function() {
			$(".sider-ul").css('left', '0');
			clrLi();
			$(".sider-ul").children('li').first().remove();
			initLi();
			$(".leftp").on('click', function(event) {
				envirLeft();
			});
	});
}
function envirRight() {
	$(".rightp").off();
	var $li=$('.sider-ul>li');
	var num=$('.sider-ul>li').length;
	if (num<=2) {return false;}
	var $new=$li.last().clone(true,true);
	$new.removeClass().css({
		'left': '-360px',
		'display': "none"
	});
	$(".sider-ul").prepend($new);
	$new.fadeIn('300', function() {});
	setTimeout(function () {
		$(".las-li").fadeOut('300', function() {});
	})
	$('.sider-ul').animate({
		left: 370+'px'
		},
		'300', function() {
			$(".sider-ul").css('left', '0');
			clrLi();
			$(".sider-ul").children('li').last().remove();
			initLi();
			$(".rightp").on('click', function(event) {
				envirRight();
			});
	});
}
