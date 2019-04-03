// 写js代码都放到一个页面加载完成的事件里面
// 目前先写原生JS 回顾HTML5新增的常用js
// window.onload = function name(params){

// }
// html5里面新的JSAPI 添加一个事件 使用函数添加不是通过标签属性 可以添加多个事件
// 可以添加一些新的事件 
// 可以控制事件触发顺序 冒泡 还是捕获  默认是false冒泡 捕获改成true
window.addEventListener('load', function () {
    // 1. 在页面加载完成才调用函数执行里面代码
    searchGradient();
    // 2. 调用倒计时功能函数
    downTime();
    // 3. 调用轮播图功能函数
    slide();
})

// 搜索框渐变的函数 一整个功能函数整个功能所有代码都放到这个函数里面写
function searchGradient() {
    /* 1. 顶部搜索栏 在滚动条页面的时候 滚动距离在轮播图高度的范围内的时候就进行背景色透明的渐变
        1. 给页面 添加一个滚动条滚动的事件
        2. 获取当前滚动条滚动的距离
        3. 获取当前轮播图的高度
        4. 通过滚动距离 / 轮播图高度 计算透明度的值
        5. 把计算的透明度设置给搜索框背景色 rgba的a就可以 */
    // 1. 把获取元素这种操作放到事件的外面 因为元素不会变不需要一直获取
    var slide = document.querySelector('#slide');
    var header = document.querySelector('#header');
    // 页面刚刚加载的时候马上调用函数触发计算透明度设置
    scroll();
    // 2. 把渐变的功能代码放到函数里面定义
    function scroll() {
        // 3. 获取当前滚动的距离 如果前面的有值使用前面 没有值使用后面
        var scrollTop = document.documentElement.scrollTop;
        // 4. 获取轮播图元素的高度 注意querySelector传人的不是id是 id选择器
        var slideHeight = slide.offsetHeight;
        // 5. 计算透明度
        var opacity = scrollTop / slideHeight;
        console.log(opacity);
        // 6. 把透明设置给搜索框背景色
        header.style.backgroundColor = 'rgba(222,24,27,' + opacity + ')';
    }
    // 7. 添加滚动的事件滚动的时候也要重新变化透明度
    document.addEventListener('scroll', function (e) {
        // 8. 在滚动的时候距离变了 透明度也变量 也要重新设置调用一些函数设置透明度
        scroll();
    });
}

// 轮播图的功能函数
function slide() {
    // 初始化swiper插件
    // 5. 最关键的初始化swiper插件 第一个参数轮播图大容器 第二个参数是配置项 要不要小圆点
    var swiper = new Swiper('.swiper-container', {
        // 配置指定小圆点
        pagination: {
            el: '.swiper-pagination',
        },
        //速度
        speed: 300,
        // 显示小手
        grabCursor: true,
        // 循环
        loop: true,
        // 自动轮播图
        autoplay: {
            delay: 1000,
            // 是否在最后一张结束自动轮播图   loop下无效
            stopOnLastSlide: false,
            // 是否在手滑之后禁止自动轮播图 true 是禁止 false不禁止
            disableOnInteraction: false,
        },
        // 左右箭头
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
}

// 倒计时 功能函数 所有倒计时功能代码在这里面写
function downTime() {
    /* 1. 倒计时功能 有一个倒计时的时间 每隔1秒时间--  把小时 分钟 秒放到页面显示
        1. 要有一个总时间 假设2小时 的秒数
        2. 定义定时器每隔1秒执行一次 
        3. 让总时间 --   减的是秒
        4. 把剩下的时候 计算时 分 秒
        5. 把时 分 秒 分别放到页面中显示 */
    // 1. 要有一个总时间 假设2小时 的秒数
    var time = 2 * 60 * 60;
    // 5. 获取页面所有倒计时的span标签
    var spans = document.querySelectorAll('.downtime span');
    console.log(spans);
    console.log(time);
    // 10. 页面刚加载 定时器不会触发 在定时器触发之前马上渲染一次
    setDownTime();
    // 把设置倒计时的代码封装到函数为了重复执行
    function setDownTime() {
        // 9. 判断如果时间没有了 
        if (time <= 0) {
            // 重新再来2小时
            time = 2 * 60 * 60;
        }
        // console.log(time);
        // 4.1 小时 总时间 / 60 / 60 而且向下去掉 剩下在分钟里面
        var hour = Math.floor(time / 60 / 60);
        // console.log(hour);
        // 4.2 分钟 总时间 / 60 % 60  / 60 求到总共多少分钟 这个分钟大于60 去掉能被60整除部分 就取模
        var minute = Math.floor(time / 60 % 60);
        // console.log(minute);
        // 4.3 秒 总时间 % 60 只要不能被60整除的都是剩下的秒  
        var second = Math.floor(time % 60);
        // console.log(second);
        // 6. 把小时的十位放到第一个span里面
        spans[0].innerHTML = Math.floor(hour / 10);
        // 把小时的个位放到第二个span里面
        spans[1].innerHTML = Math.floor(hour % 10);
        // 7. 把分钟的十位放到第四个span里面
        spans[3].innerHTML = Math.floor(minute / 10);
        // 把分钟的个位放到第五个span里面
        spans[4].innerHTML = Math.floor(minute % 10);
        // 8. 把秒的十位放到第七个span里面
        spans[6].innerHTML = Math.floor(second / 10);
        // 把秒的个位放到第八个span里面
        spans[7].innerHTML = Math.floor(second % 10);
    }
    // 2. 定义定时器每隔1秒执行一次 
    setInterval(function () {
        // 3. 让总时间 --   减的是秒
        time--;
        // 11. 时间减少的时候重新计算设置倒计时
        setDownTime();
    }, 1000)
}