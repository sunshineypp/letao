$(function () {
    mui('.mui-scroll-wrapper').scroll({
        indicators: false//是否显示滚动条
    });
    //下拉刷新
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                callback :function () {
                    //渲染购物车列表
                    $.ajax({
                        type: 'get',
                        url: '/cart/queryCart',
                        success: function (data) {
                            //判断是否登录
                            tools.checkLogin(data);
                            // console.log(data);
                            $('#OA_task_2').html( template('tpl',{data:data}) );
                            //加载完成之后，执行如下代码，不再执行刷新
                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        }
                    });
                }
            }
        }
    });
    
    //删除功能
    $('#OA_task_2').on('tap','.btn_delete',function () {
        //获取id
        var id = $(this).data('id');
        mui.confirm("您确定要删除吗？","温馨提示",["否","是"],function(e) {
            if(e.index == 0){
                mui.toast('取消删除');
            }
            else{
                $.ajax({
                    type: 'get',
                    url: '/cart/deleteCart',
                    data: {
                        "id" : [id]
                    },
                    success: function (data) {
                        tools.checkLogin(data);
                        if(data.success){
                            mui.toast('删除成功');
                            //下拉刷新一次
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();

                        }
                    }
                });
            }
        });
    });

    //编辑功能
    $('#OA_task_2').on('tap','.btn_edit',function () {
        var data = this.dataset;
        console.log(data);
        var html = template('tpl2',data);
        //要去掉空格
        html = html.replace(/\n/g,'');

        mui.confirm(html,"编辑商品", ["确定","取消"],function (e) {
            if(e.index == 0){
                //修改
                var id = data.id;
                var num = $('.mui-numbox-input').val();
                var size = $('.lt_edit_size span.now').html();
                $.ajax({
                    type: 'post',
                    url: '/cart/updateCart',
                    data: {
                        id: id,
                        num: num,
                        size: size
                    },
                    success: function (data) {
                        tools.checkLogin(data);
                        if(data.success){
                            //重新下拉刷新
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                });
            }
            else{
                mui.toast('取消编辑');
            }
        });

        //重新渲染数字框，size的单击事件
        mui(".mui-numbox").numbox();
        $('.lt_edit_size span').on('tap',function () {
            $(this).addClass('now').siblings().removeClass('now');
        })
    });
    
    //计算总金额
    $('#OA_task_2').on('change','.ck',function () {
        var total = 0;
        $(':checked').each(function (i,e) {
            total += $(this).data('price') * $(this).data('num');
        });

        $('.lt_total span').html(total);
    })
});