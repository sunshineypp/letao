$(function () {
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
        $('.child').prev().on('click',function () {
        $(this).next().slideToggle();
    });
    
    //3.左侧移动
    $('.icon_menu').on('click',function () {
        $('.lt_aside').toggleClass('now');
        $('.lt_main').toggleClass('now');
    })
});