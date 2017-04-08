$(document).ready(function(){
	$("form button").click(function() {
		
		var uesrname = $("form input[name=user]").val();
		var uesrword = $("form input[name=password]").val();
		$.ajax({
			url: 'http://www.vipyyzh.com:1080/kangmei/user/login',
			type: 'POST',
			dataType: 'json',
			data: {"user":"{username:"+uesrname+",password:"+uesrword+"}"},
			success: function(data){
				if(data.userid != null ){
					
				window.location.href = "content.html?" + data.username + "&" + data.manager;
				}
				else{
					alert("用户名或密码输入错误");
					
				}
				
				
			},
			error: function(){
				alert("请求服务器失败！");
			}
		});
		
		
	});
})