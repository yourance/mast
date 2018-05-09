
var showImageAtIndex = function(slide, index) {
    var nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    // 删除当前图片的 class 给下一张图片加上 class
    var className = 'gua-active'
    removeClassAll(className)
    // 得到下一张图片的选择器
    var nextSelector = '#id-guaimage-' + String(nextIndex)
    var img = e(nextSelector)
    img.classList.add(className)
    // 切换小圆点
    // 1. 删除当前小圆点的 class
    var indiClassName = 'gua-white'
    removeClassAll(indiClassName)
    // 2. 得到下一个小圆点的选择器
    var indiSelector = '#id-indi-' + String(nextIndex)
    var indicator = e(indiSelector)
    indicator.classList.add(indiClassName)
}

var nextIndex = function(slide, offset) {
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    // log('click slide')
    // 求出下一张图片的 id

    // if (activeIndex + 1 == numberOfImgs - 1) {
    //     nextIndex = 0
    // } else {
    //     nextIndex = activeIndex + 1
    // }
    var i = (numberOfImgs + activeIndex + offset) % numberOfImgs
    return i
}

var bindEventSlide = function() {
    var selector = '.gua-slide-button'
    bindAll(selector, 'click', function(event) {
        log('click next')
        var button = event.target
        log('button', event.target)
        // 找到 gua-slide div
        var slide = button.parentElement
        log('sild',slide)
        // 求出 button 的 data-offset
        // 上一张按钮的 offset 是 -1
        // 下一张按钮的 offset 是 1
        var offset = Number(button.dataset.offset)
        var index = nextIndex(slide, offset)
        showImageAtIndex(slide, index)
    })
}

var bindEventIndicator = function() {
    var selector = '.gua-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        log('indi 小圆点')
        var self = event.target
        var index = Number(self.dataset.index)
        log('index', index, typeof(index))
        var slide = self.closest('.gua-slide')
        // 直接播放第 n 张图片
        showImageAtIndex(slide, index)
    })
}
var bindEventIndicator = function() {
    var selector = '.gua-slide-indi'
    bindAll(selector, 'click', function(event) {
        log('indi 小圆点')
        var self = event.target
        var index = Number(self.dataset.index)
        log('index', index, typeof(index))
        var slide = self.closest('.gua-slide')
        // 直接播放第 n 张图片
        showImageAtIndex(slide, index)
    })
}
var playNextImage = function() {
    var slide = e('.gua-slide')
    // 求出下一张图片的 index
    var index = nextIndex(slide, 1)
    // 显示下一张图片
    showImageAtIndex(slide, index)
}

var autoPlay = function() {
    var interval = 2000
    setInterval(function() {
        // 每 2s 都会调用这个函数
        playNextImage()
    }, interval)
}

bindEventSlide()
bindEventIndicator()
autoPlay()
