$(document).ready(function(){

	//解析URL
	var str = location.href;
    var s = str.indexOf("?");
    var usermessage = str.substring(s+1);
    var userdeparate = usermessage.split("&");
    var pageId = userdeparate[0];
    var Type = decodeURI(userdeparate[1]);
    
    ajaxget(pageId);

    //新闻分类背景图片效果
    if (Type == "公司新闻") {
    	$(".news-1-content-nav").children().removeClass("addbac");
		$(".news-1-content-nav p:nth(0)").addClass("addbac");
    }
    if (Type == "业界动态") {
    	$(".news-1-content-nav").children().removeClass("addbac");
		$(".news-1-content-nav p:nth(1)").addClass("addbac");
    }
    if (Type == "媒体报道") {
    	$(".news-1-content-nav").children().removeClass("addbac");
		$(".news-1-content-nav p:nth(2)").addClass("addbac");
    }
		});


function ajaxget(ID){
    //请求文字内容
	$.ajax({
		url: "http://www.vipyyzh.com:1080/kangmei/news/selectNewsInfo",
		type: "GET",
		dataType: "json",
		data: {id: ID},
		success : function(data){
			$(".news-1-content-detail-show .detail-title").text(data.title);
			$(".news-1-content-detail-show .detail-time").text(data.time);
			$(".news-1-content-detail-show .detail-show").html(data.sbcontent);
	},
	   error : function() {
	   	    $(".news-1-content-detail-show").text("新闻详情页加载失败！！！");
	   }
	});


	$(".news-1-content-nav p").click(function(event){

		//点击左侧导航栏
		var classType = $(event.target).text();
		
		window.location.href = "news.html?"+encodeURI(classType);
});
}