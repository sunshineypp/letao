$(function () {
    //渲染个人信息
    $.ajax({
        type: 'get',
        url: ' /user/queryUserMessage',
        success: function (data) {
            // console.log(data);
            //验证用户是否登录
            tools.checkLogin(data);
            $('.userinfo').html( template('tpl',data) );
        }
    });

    //退出功能
    $('.logout a').on('click',function () {
        mui.confirm('您确定要退出吗？','提示',['否','是'],function (e) {
            if(e.index == 0){
                mui.toast('取消退出');
            }else{
                $.ajax({
                    type: 'get',
                    url: '/user/logout',
                    success: function (data) {
                        if(data.success){
                            location.href = "login.html";
                        }
                    }
                });
            }
        });
    })
});