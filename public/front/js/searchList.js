//滚动初始化
var sc = mui('.mui-scroll-wrapper').scroll({
    indicators: false
});

//获取地址栏的参数
var key = tools.getParam("txt");
// if(key == 'undefined'){
//
// }
// console.log(key);
//设置到输入框中
$('.lt_search input').val(key);

//搜索商品，渲染出来
var data = {
    proName: '',
    brandId: '',
    price: '',
    num: '',
    page: 1,
    pageSize: 50
};
function render(data) {
    $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: data,
        success: function (data) {
            console.log(data);
            $('.lt_product').html(template('tpl', data));
        }
    });
}
data.proName = key;
render(data);

//搜索按钮功能
$('.lt_search button').on('click', function () {
    //清除所有a的now
    $('.lt_sort a').removeClass('now');
    $('.lt_sort span').removeClass('fa-angle-up').addClass('fa-angle-down');
    //清除排序
    data.price = '';
    data.num = '';

    //获取输入框的值，为空，提示
    var txt = $('.lt_search input').val();
    if (txt === "") {
        mui.toast('请输入搜索内容');
    }
    else {
        //渲染
        data.proName = txt;
        render(data);
    }
});

//排序
$('.lt_sort a[data-type]').on('click', function () {
    $span = $(this).find('span');
    if ($(this).hasClass('now')) {
        $span.toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    } else {
        //没有 移除兄弟的now 自己添加
        $(this).addClass('now').siblings().removeClass('now');
        $('.lt_sort span').removeClass('fa-angle-up').addClass('fa-angle-down');
    }

    //判断哪个排序
    var type = $(this).data('type');
    var value = $span.hasClass('fa-angle-down') ? 2 : 1;
    //设置给data，渲染，先清空之前的数据
    data.price = '';
    data.num = '';
    
    data[type] = value;
    render(data);
});