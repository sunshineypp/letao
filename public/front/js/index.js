//屏幕滑动
mui('.mui-scroll-wrapper').scroll({
    indicators: false
});

//图片轮播
mui('.mui-slider').slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});