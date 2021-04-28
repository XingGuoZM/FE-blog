
### 物理像素(physical pixel)、设备独立像素(density-independent pixel)和css像素
物理像素又被称为设备像素，它是显示设备中最微小的物理部件，每个像素可以根据操作系统设置自己的颜色和亮度。  

设备独立像素又被称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素（如css像素），然后由相关系统转化成物理像素（老早在没有 retina 屏之前，设备独立像素与物理像素是相等的）  

css像素是一个抽象的单位，主要使用在浏览器上，用来精确度量web页面上的内容。一般情况之下，CSS像素称为与设备无关的像素(device-independent pixel)，简称DIPs

### vw和rem的异同及优缺点
rem:只需设置根目录的大小就可以调整整个页面的比例
vw:基于视口宽度而定的

### 写一个移动端自适应viewport
```js
    const viewport = function () {
        // flexible的动态计算，兼容了很多场景
        const win = window;
        const doc = win.document;
        const docEl = doc.documentElement;
        let metaEl = doc.querySelector('meta[name="viewport"]');
        const flexibleEl = doc.querySelector('meta[name="flexible"]');
        let dpr = 0;
        let scale = 0;
        let tid;

        if (metaEl) {
            console.warn('将根据已有的meta标签来设置缩放比例');
            const match = metaEl.getAttribute('content').match(/initial-scale=([\d.]+)/);

            if (match) {
                scale = parseFloat(match[1]);
                dpr = parseInt("".concat(1 / scale), 10);
            }
        } else if (flexibleEl) {
            const content = flexibleEl.getAttribute('content');

            if (content) {
                const initialDpr = content.match(/initial-dpr=([\d.]+)/);
                const maximumDpr = content.match(/maximum-dpr=([\d.]+)/);

                if (initialDpr) {
                    dpr = parseFloat(initialDpr[1]);
                    scale = parseFloat((1 / dpr).toFixed(2));
                }

                if (maximumDpr) {
                    dpr = parseFloat(maximumDpr[1]);
                    scale = parseFloat((1 / dpr).toFixed(2));
                }
            }
        }

        if (!dpr && !scale) {
            // const isAndroid = win.navigator.appVersion.match(/android/gi);
            const isIPhone = win.navigator.appVersion.match(/iphone/gi);
            const devicePixelRatio = win.devicePixelRatio;

            if (isIPhone) {
                // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
                if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                    dpr = 3;
                } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                    dpr = 2;
                } else {
                    dpr = 1;
                }
            } else {
                // 其他设备下，仍旧使用1倍的方案
                dpr = 1;
            }

            scale = 1 / dpr;
        }

        docEl.setAttribute('data-dpr', "".concat(dpr));

        if (!metaEl) {
            metaEl = doc.createElement('meta');
            metaEl.setAttribute('name', 'viewport');
            metaEl.setAttribute('content', "initial-scale=".concat(scale, ", maximum-scale=").concat(scale, ", minimum-scale=").concat(scale, ", user-scalable=no"));

            if (docEl.firstElementChild) {
                docEl.firstElementChild.appendChild(metaEl);
            } else {
                const wrap = doc.createElement('div');
                wrap.appendChild(metaEl);
                doc.write(wrap.innerHTML);
            }
        }
        function refreshRem() {
            const width = docEl.clientWidth || docEl.getBoundingClientRect().width;
            const rem = 100 * (width / 750);
            docEl.style.fontSize = "".concat(rem, "px"); // @ts-ignore

            if (window._customerStore) {
                window._customerStore.globalRem = width / 750;
            }
        } // resize在safari中，收缩屏幕的时候也会触发


        const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        win.addEventListener(resizeEvt, function () {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }, false);
        win.addEventListener('pageshow', function (e) {
            if (e.persisted) {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }
        }, false);
        refreshRem();
    };
```

### 参考
- [MDN文档 在移动浏览器中使用viewport meta标签控制布局](https://developer.mozilla.org/zh-CN/docs/Mobile/Viewport_meta_tag)
- [移动端适配](https://github.com/xiangxingchen/blog/issues/2)
- [使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)
- [可伸缩布局方案](https://github.com/amfe/lib-flexible)