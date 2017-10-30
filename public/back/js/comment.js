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

    //分类显示与隐藏
        $('.child').prev().on('click',function () {
        $(this).next().slideToggle();
    })
});