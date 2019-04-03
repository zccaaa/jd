window.addEventListener('load', function () {
    // 调用初始化左侧分类的功能函数
    initLeftSlide();
    // 初始化右侧分类的滑动
    initRightSlide();
    // 调用左侧点击吸顶功能函数
    leftCeiling();
});

// 初始化左侧分类滑动
function initLeftSlide() {
    // 注意因为页面有2个 swiper-container 使用外面选择器区分开
    // 初始化左侧的swiper插件
    var swiper = new Swiper('.category-left .swiper-container', {
        // 垂直滚动
        direction: 'vertical',
        // 支持多张图一起
        slidesPerView: 'auto',
        // 惯性
        freeMode: true,
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
        // mousewheel: true,
    });
}

// 分类左侧点击吸顶函数
function leftCeiling() {
    // 1、 滑动的父容器
    var swiperContainer = document.querySelector('.swiper-container');
    // 2. 真正做滑动的容器
    var swiperWrapper = document.querySelector('.swiper-wrapper');
    // 3. 滑动的内容的子容器
    var swiperSlide = document.querySelector('.swiper-slide');
    // 1. 获取所有li元素
    var lis = document.querySelectorAll('.category-left ul li');
    for (var i = 0; i < lis.length; i++) {
        // console.log(lis[i]);
        // 2. 给li添加一个索引  
        // 普通属性
        // lis[i].setAttribute('index',i);
        // h5里面的data- 自定义属性 和标签有关这种数据都会放到自定义属性里面 所有属性都是data-开头
        // 只会找这种属性性能快
        lis[i].dataset['index'] = i;
        // 3. 给所有li添加点击事件
        lis[i].addEventListener('click', function () {
            // console.log(this.dataset['index']);
            var index = this.dataset['index'];
            // 4. 计算位移距离 -索引  * 高度  因为往上位移是负值
            var translateY = -index * this.offsetHeight;
            console.log(translateY);
            // 5. 位移之前还要判断一下 位移的距离是否小于最小移动的距离 父容器高度 - 子容器高度
            var minTranslateY = swiperContainer.offsetHeight - swiperSlide.offsetHeight;
            console.log(minTranslateY);
            // 6. 判断当前点击位移距离是否小于最小位移距离 小于 把最小位移距离设置给你
            if (translateY < minTranslateY) {
                translateY = minTranslateY;
            }
            // 7. 给swiperWrapper 容器设置位移 因为插件本身用的是3d位移 也要使用3d位移去覆盖他
            swiperWrapper.style.transform = 'translate3d(0px, ' + translateY + 'px, 0px)';
            // swiperWrapper.style.transform = 'translateY(' + translateY + 'px)';
            swiperWrapper.style.transition = 'all 0.3s';

            // 8. 给所有li删除active
            for (var i = 0; i < lis.length; i++) {
                lis[i].classList.remove('active');
            }
            // 9. 给当前点击this添加active
            this.classList.add('active');
        });
    }
}

// 初始化右侧分类滑动
function initRightSlide() {
    // 初始化右侧swiper插件
    var swiper = new Swiper('.category-right .swiper-container', {
        // 垂直滚动
        direction: 'vertical',
        // 支持多张图一起
        slidesPerView: 'auto',
        // 惯性
        freeMode: true,
        // 右边需要滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        // mousewheel: true,
    });
}