$(function () {
    //渲染个人信息
    $.ajax({
        type: 'get',
        url: ' /user/queryUserMessage',
        success: function (data) {
            console.log(data);
            $('.userinfo').html( template('tpl',data) );
        }
    });
});