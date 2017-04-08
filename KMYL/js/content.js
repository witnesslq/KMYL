var URL1; //加载新闻
var URL; //用户添加
var askType; //新闻分类
var userMANAGER; //是否为管理员
var edithtml; //富文本编辑器的内容
var duge; //拒绝重复点击上传
var editor; //富文本编辑器对象本身
$(document).ready(function() {

    $(".right").children().css('display', 'none');
    $(".hint").css('display', 'block');

    //解析url
    var str = location.href;
    var s = str.indexOf("?");
    var usermessage = str.substring(s + 1);
    var userdeparate = usermessage.split("&");
    var userNAME = userdeparate[0];
    userMANAGER = userdeparate[1];
    $(".left-user span").text(userNAME);


    // 这里引用jquery和wangEditor.js

    editor = new wangEditor("contentMake");

    // 上传图片
    editor.config.uploadImgUrl = "http://www.vipyyzh.com:1080/kangmei/news/uploadNewsPicture";
    editor.config.uploadImgFileName = "picture";

    $(".button-con button:nth(0)").click(function() {
        // 获取编辑器区域完整html代码
        edithtml = editor.$txt.html();
        $(".case-form1-show").css("display", "block");
        $(".case-form1-show-detail").html(edithtml);

        $(".case-form1-show").click(function() {
            $(".case-form1-show").css("display", "none");
        });
    });
    editor.create();

    //点击文章页面
    $(".left-function1 p:lt(3) a").click(function(event) {

        $(".right").children().css('display', 'none');
        $(".left-function1 p").removeClass('left-function-style');
        $(".left-function2 p").removeClass('left-function-style');
        $(event.target).parent().addClass('left-function-style');
        askType = $(event.target).text();


        $(".right-content").css('display', 'block');
        URL1 = "http://www.vipyyzh.com:1080/kangmei/news/selectNewsClass";

        indexshow(URL1, askType);
        //添加按钮
        $(".right-add a").click(function(event) {
            var sign = 1;
            filePhoto(sign);
        });

    });

    //点击视频页面
    $(".left-function1 p:nth(3) a").click(function(event) {


        $(".right").children().css('display', 'none');
        $(".left-function1 p").removeClass('left-function-style');
        $(".left-function2 p").removeClass('left-function-style');
        $(event.target).parent().addClass('left-function-style');
        $(".right-content").css('display', 'block');
        URL1 = "http://www.vipyyzh.com:1080/kangmei/news/selectNewsClass";

        askType = $(event.target).text();
        indexshow(URL1, askType);
        //添加按钮
        $(".right-add a").click(function(event) {
            var sign = 0;
            filePhoto(sign);
        });

    });

    //点击用户管理
    $(".left-function2 p:nth(0) a").click(function(event) {
        if (userMANAGER == 1) {
            $(".left-function1 p").removeClass('left-function-style');
            $(".left-function2 p").removeClass('left-function-style');
            $(event.target).parent().addClass('left-function-style');
            $(".table-message table tr:gt(1)").remove();
            $(".right").children().css('display', 'none');
            $(".right-manager").css('display', 'block');
            URL = "http://www.vipyyzh.com:1080/kangmei/user/lookUser";
            ajaxManager(URL, userMANAGER);
        } else {
            alert("此功能需管理员权限，该用户无法操作！");
        }
    });


    //注销登陆
    $(".left-function2 p:nth(1) a").click(function() {
        if (confirm("确定注销登陆?")) {
            window.location.href = "login.html";
        }
    });

});

//加载对应的内容
function indexshow(URL11, titleType) {
    $(".right-content-left ul").empty();
    $.ajax({
        url: URL11,
        type: 'GET',
        dataType: 'json',
        data: { newsclass: titleType },
        success: function(data) {

            //请求成功后加载相应内容
            for (var i = 0; i < data.length; i++) {
                $("<li><a href=\"javascript:void(0)\"></a><span></span><p></p></li>").appendTo($(".right-content-left ul"));
                $(".right-content-left ul li:last-child p").text(data[i].title);
                $(".right-content-left ul li:last-child span").text(data[i].id);
            }

            //点击标题加载具体内容
            $(".right-content-left ul li").click(function(event) {
                var messageID = $(this).find("span").text();
                var URL2 = "http://www.vipyyzh.com:1080/kangmei/news/selectNewsInfo";
                showDetail(URL2, messageID);
            });
        },
        error: function() {
            alert("加载失败");
        }
    });
}

//根据标题加载具体内容
function showDetail(URL22, mTitleID) {
    $.ajax({
        url: URL22,
        type: 'GET',
        dataType: 'json',
        data: { id: mTitleID },
        success: function(data) {

            //请求成功后更新上传者和时间和ID
            $(".right-content-tip p:eq(0)").text(data.username);
            $(".right-content-tip p:eq(1)").text(data.time);
            $(".right-content-tip p:eq(2)").text(data.content);


            //删除某一篇文章
            $(".delete2").click(function(event){
                duge = 1;
                if (duge == 1) {
                    duge = 0;

                    $.ajax({
                        url: 'http://www.vipyyzh.com:1080/kangmei/news/delete',
                        type: 'GET',
                        dataType: 'json',
                        data: { id: mTitleID },
                        success: function(data) {
                            alert(data.msg);
                            // indexshow(URL1, askType);
                            window.location.reload();
                        },
                        error: function() {
                            alert("删除时访问服务器失败");
                            duge = 1;
                        }
                    });
                }

            });
        },
        error: function() {
            alert("请求服务器失败！");
        }
    });
}

//上传文章及视频
function filePhoto(Sign) {

    //上传文章
    if (Sign == 1) {
        //重置表单
        document.getElementsByClassName("case-form-option")[0].reset();
        document.getElementsByClassName("case-form-file")[0].reset();
        editor.clear();
        $(".right").children().css('display', 'none');
        $(".right-case-fileup").css('display', 'block');

        //鼠标焦点事件判断是否为空

        $(".case-form1-first input").focus(function() {
            $(this).parent().children("span").css("display", "none");
        });
        $(".case-form1-first input").blur(function() {
            if ($(this).val() == "") {
                $(this).parent().children("span").css("display", "block");
            }

        });


        duge = 1;


        $(".button-con button:nth(1)").click(function() {

            if (duge == 1) {
                duge = 0;

                var MyForm = new FormData(document.getElementsByClassName("case-form-file")[0]);
                MyForm.append("newsclass", $("#selectID1").val());
                MyForm.append("username", $(".left-user span").text());
                MyForm.append("title", $(".case-form-option .title").val());
                MyForm.append("content", $(".case-form-option .subcontent").val());
                MyForm.append("sbcontent", edithtml);
                $.ajax({
                    url: "http://www.vipyyzh.com:1080/kangmei/news/insert",
                    type: "POST",
                    data: MyForm,
                    processData: false, // 告诉jQuery不要去处理发送的数据
                    contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                    success: function(data) {
                        alert(data.msg);
                        // indexshow(URL1, askType);
                        window.location.reload();

                    },
                    error: function() {
                        alert("上传失败！");
                        duge = 1;


                    }
                });
            }

        });



    }
    //上传视频
    if (Sign == 0) {
        //重置表单
        document.getElementsByClassName("case-news-option")[0].reset();
        document.getElementsByClassName("case-news-file")[0].reset();
        $(".right").children().css('display', 'none');
        $(".right-news-fileup").css('display', 'block');

        //鼠标焦点事件判断是否为空

        $(".case-news1-first input").focus(function() {
            $(this).parent().children("span").css("display", "none");
        });
        $(".case-news1-first input").blur(function() {
            if ($(this).val() == "") {
                $(this).parent().children("span").css("display", "block");
            }

        });


        duge = 1;

        $(".case-news-file button").click(function() {
            if (duge == 1) {
                duge = 0;
                var MyForm = new FormData(document.getElementsByClassName("case-news-file")[0]);
                MyForm.append("newsclass", $("#selectID2").val());
                MyForm.append("username", $(".left-user span").text());
                MyForm.append("title", $(".case-news-option .title").val());
                MyForm.append("sbcontent", $(".case-news-option .URL").val());
                MyForm.append("content", $(".case-news-option .subcontent").val());

                $.ajax({
                    url: "http://www.vipyyzh.com:1080/kangmei/news/insert",
                    type: "POST",
                    data: MyForm,
                    processData: false, // 告诉jQuery不要去处理发送的数据
                    contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                    success: function(data) {
                        alert(data.msg);
                        // indexshow(URL1, askType);
                        window.location.reload();
                    },
                    error: function() {
                        alert("上传失败！");
                        duge = 1;
                    }
                });
            }

        });
    }
}


//用户管理功能封装
function ajaxManager(requireURL, userManage) {
    $.ajax({
        url: requireURL,
        type: 'GET',
        dataType: 'json',
        data: null,
        success: function(data) {

            //更新信息
            for (var i = 0; i < data.length; i++) {
                $(".table-message table tr:last-child td:eq(0)").text(data[i].username);
                $(".table-message table tr:last-child td:eq(1)").text(data[i].post);
                $("table tr:eq(1)").clone().appendTo("table");
            }
            $(".table-message table tr:last-child").remove();


            //添加用户
            $(".table-add").click(function(event) {

                
                $(".table-suredelete").css('display', 'none');
                $(".user-add").css('display', 'block');
                $(".user-add form input").each(function() {
                    $(this).val("");
                });


                //确认添加
                $(".user-add-sure").click(function() {
                    duge = 1;
                    if (duge == 1) {
                        duge = 0;


                        var userName = $(".user-add-name").val();
                        var userPass = $(".user-add-pass").val();
                        var userType1 = $(".user-add-type").val();
                        $.ajax({
                            url: 'http://www.vipyyzh.com:1080/kangmei/user/insertUser',
                            type: 'POST',
                            dataType: 'json',
                            data: { "user": "{username:" + userName + ",password:" + userPass + ",post:" + userType1 + "}" },
                            success: function(data) {
                                alert(data.msg);

                                $(".user-add").css('display', 'none');
                                // ajaxManager(URL, userMANAGER);
                                window.location.reload();

                            },
                            error: function() {
                                alert("添加用户时访问服务器失败！");
                                // duge = 1;
                            }
                        });
                    }

                });

                //取消添加
                $(".user-add-cancel").click(function() {
                    $(".user-add").css('display', 'none');
                });

            });

            //删除用户
            $(".table-delete a").click(function(event) {
                $(".user-add").css('display', 'none');
                $(".table-suredelete").css('display', 'block');
                var userdeletename = $(event.target).parent().prev().prev().text();
                duge = 1;


                //确认删除
                if (duge == 1) {
                    duge = 0;
                    $(".user-delete2").click(function() {
                        $.ajax({
                            url: 'http://www.vipyyzh.com:1080/kangmei/user/delete',
                            type: 'GET',
                            dataType: 'json',
                            data: { username: userdeletename },
                            success: function(data) {
                                alert(data.msg);
                                $(".table-suredelete").css('display', 'none');
                                // ajaxManager(URL, userMANAGER);
                                window.location.reload();

                            },
                            error: function() {
                                alert("删除用户时访问服务器失败！");
                                duge = 1;
                            }
                        })


                    });
                }


                //取消删除
                $(".user-delete3").click(function() {
                    $(".table-suredelete").css('display', 'none');
                });
            });


        },
        error: function() {
            alert("请求所有用户信息时访问服务器失败！");
        }
    });
}
