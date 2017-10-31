$(function () {
    var currentPage = 1;
    var pageSize = 8;

    //渲染数据
    function render() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                // console.log(data);
                var html = template('tpl', data);
                $("tbody").html(html);

                //分页功能
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//指定bootstrap的版本
                    currentPage: currentPage,//指定了当前是第几页
                    size: "small",
                    totalPages: Math.ceil(data.total / pageSize),
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });
            }

        });


    }

    render();

    //更改启用状态
    //动态创建 用委托
    $('tbody').on('click', '.btn', function () {
        //让模态框显示
        $('#isDeleteModal').modal('show');
        var id = $(this).parent().data('id');
        var isDelete = $(this).parent().data('isDelete');
        isDelete = isDelete === 1 ? 0 : 1;
        
        //点击确定按钮
        $('.btn_delete').on('click',function () {
            $.ajax({
                type: 'post',
                url: ' /user/updateUser',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function (data) {
                    if(data.success){
                        $('#isDeleteModal').modal('hide');
                        render();
                    }
                }
            });
        })
    })
});