//滚动初始化
mui('.mui-scroll-wrapper').scroll({
    indicators: false
});

//左侧初始化，渲染一级分类
$.ajax({
    type: 'get',
    url: ' /category/queryTopCategory',
    success: function (data) {
        $('.lt_category_l .mui-scroll').html( template('tpl',data) );

        getSecondCag(data.rows[0].id)
    }
});

//渲染二级分类
function getSecondCag(id) {
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategory',
        data: {
            id: id
        },
        success: function (data) {
            $('.lt_category_r .mui-scroll').html( template('tpl2',data) );
        }
    });
}

//一级分类单击事件
$('.lt_category_l .mui-scroll').on('click','li',function () {
    //给自己添加now类，兄弟都移除
    $(this).addClass('now').siblings().removeClass('now');
    //渲染二级分类，如果没有：显示：暂时没有更多数据
    var id = $(this).data('id');
    getSecondCag(id);
});