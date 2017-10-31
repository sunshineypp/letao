$(function () {
    var currentPage = 1;
    var pageSize = 5;

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
            }
        });
    }
    render();
});