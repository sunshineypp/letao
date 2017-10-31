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
});