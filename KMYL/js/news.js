var pageNum; //页数
var classType; //新闻分类
$(document).ready(function(){

	//解析URL
	var str = location.href;
	if (str.indexOf("?") != -1) {
		var s = str.indexOf("?");
        classType = decodeURI(str.substring(s+1));
	}
	else{
		classType = "公司新闻";
	}

	//刷新页面直接请求
	pageNum = 1;

	//新闻分类背景图片效果
    if (classType == "公司新闻") {
    	$(".news-1-content-nav").children().removeClass("addbac");
		$(".news-1-content-nav p:nth(0)").addClass("addbac");
    }
    if (classType == "业界动态") {
    	$(".news-1-content-nav").children().removeClass("addbac");
		$(".news-1-content-nav p:nth(1)").addClass("addbac");
    }
    if (classType == "媒体报道") {
    	$(".news-1-content-nav").children().removeClass("addbac");
		$(".news-1-content-nav p:nth(2)").addClass("addbac");
    }
    if (classType == "视频新闻") {
    	$(".news-1-content-nav").children().removeClass("addbac");
		$(".news-1-content-nav p:nth(3)").addClass("addbac");
    }
	
	show(classType,pageNum);
	showNum(classType);


	//新闻页加载
	$(".news-1-content-nav p").click(function(event){

		//新闻分类背景图片效果
		$(event.target).parent().children().removeClass("addbac");
		$(event.target).addClass("addbac");

		classType = $(event.target).text();
		window.location.href = "news.html?"+encodeURI(classType);
		// pageNum = 1;
		// show(classType,pageNum);
		// showNum(classType);	

    });

    //点击页数加载
	$(".news-1-content-show .page p").click(function(event){

		pageNum = $(event.target).text();
		show(classType,pageNum);

		//页数的背景效果

		$(event.target).parent().children().removeClass("num");
		$(event.target).addClass("num");
	})
});

//分类加载条数5条
function show(caseType,Page){
	$(".news-1-content-show .show:gt(0)").remove();
	$(".news-1-content-show .page p:first").addClass("num");
	$.ajax({
		url: 'http://www.vipyyzh.com:1080/kangmei/news/selectNewsClassByPage',
		type: 'GET',
		dataType: 'JSON',
		data: {page: Page,newsclass: caseType},
		success: function(data){

			if ($(".news-1-content-show").children("show").length < 1) {
				$(".news-1-content-show .show:last").css("display","block");
			}
			for(var i=0,len = data.length;i<len;i++){

				if (data[i].newsclass == "视频新闻") {
				    $(".news-1-content-show .show:last").find("a").attr("href",data[i].sbcontent);
				    $(".news-1-content-show .show:last .img img").attr("src",data[i].url);
				    $(".news-1-content-show .show:last .detail-title").text(data[i].title);
				    $(".news-1-content-show .show:last .detail-con").text(data[i].content);
				    var tim = data[i].time;
				    $(".news-1-content-show .show:last .time .year").text(tim.substring(0,7));
				    $(".news-1-content-show .show:last .time .day").text(tim.substring(8,10));

				    $(".news-1-content-show .page").before($(".news-1-content-show .show:last").clone(true));
			    }

				
				
			    else{
			    	$(".news-1-content-show .show:last").find("a").attr("href", "news-detail.html?" + data[i].id + "&" + encodeURI(data[i].newsclass));
			    	$(".news-1-content-show .show:last .img img").attr("src",data[i].url);
				    $(".news-1-content-show .show:last .detail-title").text(data[i].title);
				    $(".news-1-content-show .show:last .detail-con").text(data[i].content);
				    var tim = data[i].time;
				    $(".news-1-content-show .show:last .time .year").text(tim.substring(0,7));
				    $(".news-1-content-show .show:last .time .day").text(tim.substring(8,10));

				    $(".news-1-content-show .page").before($(".news-1-content-show .show:last").clone(true));
			    }
			}
			if ($(".news-1-content-show").children("show").length > 1) {
				$(".news-1-content-show .show:last").remove();
			}
			else{
				
				$(".news-1-content-show .show:last").css("display","none");
			}


			



		},
		error: function(){
			$(".news-1-content-show .show").text("新闻加载失败!!!");
		}
	});
}

//动态显示总页数
function showNum(classType1){
	$(".news-1-content-show .page p:gt(0)").remove();
	$.ajax({
		url: 'http://www.vipyyzh.com:1080/kangmei/news/selectNewsClassByPageSum',
		type: 'GET',
		dataType: 'JSON',
		data: {newsclass: classType1},
		success: function(data){
			
			//计算页数
			var pm = parseInt(data.sum);
			pmt = parseInt((pm-1)/5) + 1;
			for(var i=0;i<pmt ; i++){
				$(".news-1-content-show .page").append($(".news-1-content-show .page p:last-child").clone(true));
				$(".news-1-content-show .page p:last-child").text( parseInt(i) + 2);
				$(".news-1-content-show .page p:last-child").removeClass("num");

			}
			$(".news-1-content-show .page p:last-child").remove();

			// $(".news-1-content-show .page p").each(function(i){
			// 	$(this).text( parseInt(i) + 1);
			// });

		},
		error: function(){
			$(".news-1-content-show .page").text("页数加载失败!!!");
		}
	});

}

