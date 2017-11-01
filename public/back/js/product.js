$(function () {
    var currentPage = 1;
    var pageSize = 5;
    var imgArray = [];

    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                // console.log(data);
                var html = template('tpl',data);
                $('tbody').html(html);

                //分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total/pageSize),
                    size: 'small',
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                });
            }
        });
    }
    render();
    
    //点击添加显示模态框
    $('.btn_add').on('click',function () {
        //显示模态框
        $('#addModal').modal('show');

        //获取二级菜单
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {
                $('.dropdown .dropdown-menu').html(template('tpl2',data));
            }
        });
    });

    //点击下拉菜单设置值
    $('.dropdown .dropdown-menu').on('click','a',function () {
        $('.dropdown_text').text($(this).text());
        $('#brandId').val($(this).data('id'));
    });

    //文件上传
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e,data) {
            $('.img_box').append('<img src="'+data.result.picAddr+'" width="100" height="100">')

            imgArray.push(data.result);

            //如果imgArray的数组长度=3，校验完成
            if(imgArray.length === 3){
                $form.data('bootstrapValidator').updateStatus('productLogo','VALID');
            }else {
                $form.data('bootstrapValidator').updateStatus('productLogo','INVALID');
            }
        }
    });
    
    //校验
    $form = $('#form');
    $form.bootstrapValidator({
        //默认不校验的配置
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "商品名称不能为空"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "商品描述不能为空"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    }
                },
                regexp: {
                    //必须是0以上的数字
                    regexp:/^[1-9]\d*$/,
                    message: "请输入一个大于0的库存"
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺寸"
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: "请输入正确的尺码（30-50）"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的折扣价"
                    }
                }
            },
            productLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传三张图片"
                    }
                }
            }

        }
    });

    $form.on('success.form.bv',function (e) {
        e.preventDefault();

        //添加上图片
        var param = $form.serialize();
        param += "&picName1=" + imgArray[0].picName + "&picAddr1" + imgArray[0].picAddr;
        param += "&picName2=" + imgArray[1].picName + "&picAddr2" + imgArray[1].picAddr;
        param += "&picName3=" + imgArray[2].picName + "&picAddr3" + imgArray[2].picAddr;

        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data : param,
            success: function (data) {
                if(data.success){
                    //关闭模态框
                    $('#addModal').modal('hide');

                    //重新渲染第一页
                    currentPage = 1;
                    render();

                    //重置表单
                    $form.data("bootstrapValidator").resetForm();
                    $form[0].reset();

                    //手动重置下拉框文字、图片
                    $('.dropdown_text').text("请选择二级分类");
                    $('.img_box img').remove();
                    imgArray = [];
                }
            }
        });
    })
});