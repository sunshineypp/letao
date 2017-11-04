$(function () {
    $('.btn_login').on('click',function () {
        var username = $("[name='username']").val();
        var password = $("[name='password']").val();

        if(!username){
            mui.toast('请输入用户名');
            return false;
        }
        if(!password){
            mui.toast('请输入密码');
            return false;
        }

        $.ajax({
            type: 'post',
            url: ' /user/login',
            data: {
                username: username,
                password: password
            },
            success: function (data) {
                // console.log(data);
                if(data.error == 403){
                    mui.toast(data.message);
                }
                if(data.success){
                    //判断是否传有参数，传递就跳回，否则，去个人中心
                    var search = location.search;
                    // console.log(search);
                    //判断有没有retUrl
                    if(search.indexOf('retUrl') > -1){
                        //有，跳回去
                        search = search.replace('?retUrl=','');
                        // console.log(search);
                        location.href = search;
                    }else{
                        location.href = "user.html";
                    }
                }
            }
        });
    });
});