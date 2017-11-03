//区域滚动
mui('.mui-scroll-wrapper').scroll({
    indicators: false
});
//封装 获取缓存历史
function getHistory() {
    var search_history = localStorage.getItem('lt_search_history') || "[]";
    var arr = JSON.parse(search_history);
    return arr;
}

//渲染页面
function render() {
    var arr = getHistory();
    // console.log(arr);
    $('.lt_history').html( template('tpl',{arr: arr}) );
}
render();

//搜索按钮单击事件
//获取文本框中的值，如果用户没有输入关键字，给用户一个提示
//把值存储到缓存区中
//跳转页面
$('.lt_content .lt_search button').on('click',function () {
    var txt = $('.lt_content .lt_search input').val().trim();
    if(txt === 0){
        mui.alert('请输入您想搜索的内容','温馨提示');
        return;
    }
    //获取缓存数据
    var arr = getHistory();
    //判断缓存中是否有输入内容
    var index = arr.indexOf(txt);
    if(index > -1){
        //有，删掉
        arr.splice(index,1);
    }
    if(arr.length >= 10){
        arr.pop();
    }
    arr.unshift(txt);
    
    //把新数组添加到缓存中
    localStorage.setItem('lt_search_history',JSON.stringify(arr));
    
    //页面跳转
    location.href = "searchList.html?txt="+txt;
});

//清空历史单击事件
$('.lt_history').on('click','.clear_empty',function () {
    //提示是否删除
    var btnArr = ["是","否"];
    mui.confirm("你确定要删除这条记录吗","警告",btnArr,function (data) {
        //0:是 1：否
        if(data.index == 0){
            //删除缓存，重新渲染
            localStorage.removeItem('lt_search_history');
            render();
            mui.toast('清空完成');
        }else{
            mui.toast('取消清空');
        }
    });

});

//删除按钮单击事件
$('.lt_history').on('click','.fa-times',function () {
    //获取缓存记录
    var arr = getHistory();
    //获取当前要删除的下标
    var index = $(this).data('index');
    //删除，重新存储缓存数据，重新渲染
    arr.splice(index,1);
    localStorage.setItem('lt_search_history',JSON.stringify(arr));
    render();
});

