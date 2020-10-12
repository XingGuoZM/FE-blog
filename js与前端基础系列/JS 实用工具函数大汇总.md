1. 移动端视口自适应 viewport
```
const viewport = function () {
    // flexible的动态计算，兼容了很多场景
    const win = window;
    const doc = win.document;
    const docEl = doc.documentElement;
    const metaEl = doc.querySelector('meta[name="viewport"]');
    const flexibleEl = doc.querySelector('meta[name="flexible"]');
    const dpr = 0;
    const scale = 0;
    const tid;

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

        if (window.__xsandStore__) {
            // @ts-ignore
            window.__xsandStore__.globalRem = width / 750;
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
2. 判断当前终端是Android还是IOS
```
// IOS
const isIOS = () => {
  if (typeof window.navigator.userAgent !== 'string') return false;
  const u = window.navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};

//Android
const isAndroid = () => {
  if (typeof window.navigator.userAgent !== 'string') return false;

  return /android/i.test(window.navigator.userAgent.toLowerCase());
};

//iphoneX
const isIphoneX = () => {
  if (typeof window.navigator.userAgent !== 'string') return false;
  const u = window.navigator.userAgent;
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

  if (isIOS) {
      if (
      (window.screen.height === 812 && window.screen.width === 375)
      || (window.screen.height === 896 && window.screen.width === 414)
      ) {
      return true;
      }
  }
  return false;

}
```

3. 节流与防抖
```js
// 节流
const throttle = function(fn,delay){
  let prev = Date.now()
  return  ()=> {
    let now = Date.now()
    if (now - prev >= delay) {
        fn()
        prev = Date.now()
    }  
  }
}
// 防抖
const debounce = function(fn,delay){
  let timer = null
  return ()=> {
    clearTimeout(timer)
    timer = setTimeout(()=>fn(), delay)
  }
}
```

4. 获取url指定参数的值
```js
    function getUrlParams(key) {
        let reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`, 'i');
        let params = window.location.search.substr(1).match(reg);
        return params && decodeURIComponent(params[2]);
    }
```

5. 判断是否为数组
```js
//法一
const isArray1=function(value){
    return Object.prototype.toString.apply(value)==='[object Array]'
}
//法二
const isArray2=function(value){
    return Array.isArray(value)
}
```

6. 快速将数字字符串转数字
```js
function strToInt(n){
  return ~~n;
}
console.log(strToInt('1000000000'))
```

7. 快速将时间类型转时间戳

```js
// 入参：YYYY/MM/DD hh:mm:ss
// 出参：对应时间的时间戳
function dateToTimeStamp(date){
  if(date) return +new Date(date);
  return +new Date();
}
console.log(dateToTimeStamp('2020/09/28 18:00:00'));
```

8. js获取translateX的值
```js
function getTranslateX(element) {
  var style = window.getComputedStyle(element);
  var matrix = new WebKitCSSMatrix(style.webkitTransform);
  console.log('translateX: ', matrix.m41);
}
```

9. 对象克隆
```js
// 法一
JSON.parse(JSON.stringify(obj)) 
// 法二

```