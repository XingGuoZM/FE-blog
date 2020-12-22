
### 关于URL
```js
// 获取当前url
window.location.href

// 获取当前url参数,即？之后的部分
window.location.search

//获取当前url的hash值，即#之后的部分
```
- 方法一：正则
```js
    function getUrlParams(key) {
        let reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`, 'i');
        let params = window.location.search.substr(1).match(reg);
        return params && decodeURIComponent(params[2]);
    }
```
- 方法二：字符串切割+循环遍历
```js

```
- 方法三：使用URI.js
```js
// params 为要查询的参数
const {params}=URI().query(true)

```

### 参考  
- [js获取url参数值的几种方式](https://www.jianshu.com/p/708c915fb905)
- [URI.js](https://github.com/medialize/URI.js)