$(function () {
    var currentPage = 1;
    var pageSize = 5;
    function render() {
        $.ajax({
            type: 'get',
            url: ' /category/queryTopCategoryPaging',
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
                    currentpage: currentPage,
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

    //添加分类
    $('.btn_add').on('click',function () {
        //让模态框显示
        $('#addModal').modal('show');
    });

    var $form = $('#form');

    $form.bootstrapValidator({
        //校验时使用的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{

            //name属性
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"一级分类名称不能为空"
                    }
                }
            }

        }
    });
    
    //验证成功之后
    $form.on('success.form.bv',function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: ' /category/addTopCategory',
            data: $form.serialize(),
            success: function (data) {
                if(data.success){
                    //让模态框显示
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render();

                    //重置表单
                    $form.data('bootstrapValidator').resetForm();
                    $form[0].reset();
                }
            }
        });
    });
});