$(function () {
    var form = $('#form');
    //初始化表单验证插件
    form.bootstrapValidator({
        //指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback: {
                        message: '用户名错误'
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6到12之间'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    });
    
    //获取表单验证实例
    var validator = form.data('bootstrapValidator');
    form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type : 'post',
            url : '/employee/employeeLogin',
            data : form.serialize(),
            success: function (data) {
                if(data.success){
                    location.href = "index.html";
                }
                else{
                    if(data.error === 1000){
                        validator.updateStatus('username', 'INVALID', 'callback');
                    }
                    if(data.error === 1001){
                        validator.updateStatus('password', 'INVALID', 'callback');
                    }
                }
            }
        });
    });
    
    //重置按钮
    $('[type=reset]').on('click',function () {
        //重置表单，并且会隐藏所有的错误提示和图标
        validator.resetForm();
    })
});