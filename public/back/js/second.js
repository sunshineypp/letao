$(function () {
    var currentPage = 1;
    var pageSize = 5;

    var $form = $('#form');

    function render() {
        $.ajax({
            type: 'get',
            url: ' /category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                var html = template('tpl',data);
                $('tbody').html(html);

                //分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    size: 'small',
                    totalPages: Math.ceil(data.total/pageSize),
                    onPageClicked: function (event, originalEvent, type, page) {
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }
    render();

    $('.btn_add').on('click',function () {
        $('#addModal').modal('show');

        //获取一级分类
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {
                var html = template('tpl2',data);
                $('.dropdown .dropdown-menu').html(html);
            }
        });
    });


    //点击下拉菜单按钮，设置值
    $('.dropdown .dropdown-menu').on('click','a',function () {
        $('.dropdown_text').html($(this).html());
        $('#categoryId').val($(this).data('id'));

        //categoryId通过校验
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });


    //文件上传
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e,data) {
            // console.log(data);
            $(".img_box img").attr("src", data.result.picAddr);
            $("#brandLogo").val( data.result.picAddr );
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });

    //校验
    $form.bootstrapValidator({
        //默认不校验的配置
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类的名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传图片'
                    }
                }
            }
        }
    });

    //校验成功后提交
    $form.on('success.form.bv',function (e) {
        e.preventDefault();
        // console.log($form.serialize());
        $.ajax({
            type: 'post',
            url:"/category/addSecondCategory",
            data: $form.serialize(),
            success: function (data) {
                console.log(data);
                if(data.success){
                    //关闭模态框
                    $('#addModal').modal('hide');
                    //重新渲染第一页
                    currentPage = 1;
                    render();
                    //重置表单
                    $form[0].reset();
                    $form.data('bootstrapValidator').resetForm();
                    //手动把dropdown重置，把图片的地址重置
                    $(".dropdown-text").text("请选择一级分类");
                    $(".img_box img").attr("src", "images/none.png");
                }
            }
        });
    });

});