$(function () {
    //校验用户是否登录
    if (location.href.indexOf('login.html') < 0) {
        $.ajax({
            type: 'get',
            url: '/employee/checkRootLogin',
            success: function (data) {
                if (data.error === 400) {
                    location.href = "login.html";
                }
            }
        });
    }


    //1.进度条
    $(document).ajaxStart(function () {
        //开启进度条
        NProgress.start();
    });
    $(document).ajaxStop(function () {
        //关闭进度条
        NProgress.done();
    });

    //2.分类显示与隐藏
    $('.child').prev().on('click', function () {
        $(this).next().slideToggle();
    });

    //3.左侧移动
    $('.icon_menu').on('click', function () {
        $('.lt_aside').toggleClass('now');
        $('.lt_main').toggleClass('now');
    });

    //4.退出功能
    $('.icon_logout').on('click', function () {
        $('#logoutModal').modal('show');
    });
    $('.btn_logout').on('click', function () {
        //告诉后台要退出了
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            success: function (data) {
                if (data.success) {
                    window.location.href = "login.html";
                }
            }
        });
    })
});