
### 关于URL
```
// 获取当前url
window.location.href

// 获取当前url参数,即？之后的部分
window.location.search

//获取当前url的hash值，即#之后的部分
```
- 方法一：正则
```
    function getUrlParams(key) {
        let reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`, 'i');
        let params = window.location.search.substr(1).match(reg);
        return params && decodeURIComponent(params[2]);
    }
```
- 方法二：字符串切割+循环遍历
```

```

### 参考  
- [js获取url参数值的几种方式](https://www.jianshu.com/p/708c915fb905)