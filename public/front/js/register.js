$(function () {
    //短信验证功能
    $('.btn_getCode').on('click',function () {
        //先判断有没有disabled这个类
        var $this = $(this);
        if($this.hasClass('disabled')){
            return false;
        }

        //没有就添加
        $this.addClass('disabled').html('正在发送中...');

        //发送请求，模拟手机获取验证码
        $.ajax({
            type: 'get',
            url: '/user/vCode',
            success: function (data) {
                //改变按钮值
                var num = 60;
                var timer = setInterval(function () {
                    num--;
                    $this.html(num +'秒后发送');
                    if(num <= 0){
                        $this.removeClass('disabled').html('再次发送');
                        clearInterval(timer);
                    }
                },1000);

                console.log(data);
            }
        });
    });

    //注册功能
    $('.btn_register').on('click',function () {
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        var repassword = $('[name=repassword]').val();
        var mobile = $('[name=mobile]').val();
        var vCode = $('[name=vCode]').val();

        //验证
        if(!username){
            mui.toast('用户名不能为空');
            return false;
        }
        if(!password){
            mui.toast('密码不能为空');
            return false;
        }
        if(!repassword){
            mui.toast('确认密码不能为空');
            return false;
        }
        if(password != repassword){
            mui.toast('两次输入的密码不一致');
            return false;
        }
        if(!mobile){
            mui.toast('手机号不能为空');
            return false;
        }
        // /^1[34578]\d{9}$/
        if(!/^1[34578]\d{9}$/.test(mobile)){
            mui.toast('请输入合法的手机号');
            return false;
        }
        if(!vCode){
            mui.toast('验证码不能为空');
            return false;
        }
        if(!/^\d{6}$/.test(vCode)){
            mui.toast('请输入合法的验证码');
            return false;
        }

        //发送ajax请求
        $.ajax({
            type: 'post',
            url: '/user/register',
            data: {
                username : username,
                password : password,
                mobile : mobile,
                vCode : vCode
            },
            success: function (data) {
                if(data.success){
                    mui.toast('登录成功，即将跳转到登录界面');
                    location.href = "login.html";
                }
                else{
                    mui.toast(data.message);
                }
            }
        });
    })
});