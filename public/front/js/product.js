$(function () {
    //屏幕滑动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });

    //现获取id
    var id = tools.getParam('id');
    // console.log(id);
    //加载数据
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (data) {
            // console.log(data);

            //获取全部尺码
            var size = data.size.split('-');
            // console.log(size);
            var sizeArr = [];
            for (var i = size[0]; i <= size[1]; i++) {
                sizeArr.push(i);
                // console.log(sizeArr);
            }
            data.sizeArray = sizeArr;
            $('.mui-scroll').html( template('tpl',data) );

            //图片轮播
            mui('.mui-slider').slider({
                interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            //mui在mui.init()中会自动初始化基本控件,但是 动态添加的Numbox组件需要手动初始化
            mui(".mui-numbox").numbox();
        }
    });

    //点击尺码，选中
    $('.mui-scroll').on('click','.size',function () {
        $(this).addClass('now').siblings().removeClass('now');
    });
    
    //添加到购物车功能
    $('.btn_add_cart').on('click',function () {
        // 获取尺码和数量
        var size = $('.size.now').html();
        var num = $('.mui-numbox-input').val();

        if(!size){
            mui.toast('请选择尺码');
            return;
        }
        // console.log(size +" : "+num);
        $.ajax({
            type: 'post',
            url: '/cart/addCart',
            data: {
                productId : id,
                num: num,
                size: size
            },
            success: function (data) {
                if(data.error === 400){
                    //未登录，跳转到登录界面。要传递当前地址
                    location.href = "login.html?retUrl="+location.href;
                }
                if(data.success){
                    mui.toast('添加成功');
                }
            }
        });
    });
    
});