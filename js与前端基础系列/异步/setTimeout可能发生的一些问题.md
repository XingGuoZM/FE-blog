setTimeout 延时器，指在指定时间间隔之后执行某些操作。

### setTimeout的第三个参数
[mdn文档](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout#%E5%8F%82%E6%95%B0)中解释了setTimeout可以接收多个参数，其中第三个参数就是可以作为附加参数传递给回调函数。

### 当setTimeout遇到this

### 当setTimeout遇到promise
setTimeout是宏任务，promise是微任务，有先后之行次序的问题
```js
console.log(1);
setTimeout(() => console.log(2), 1000);
new Promise((resolve) => resolve(3)).then(res => console.log(res));
console.log(4);
```

### 当setTimeout遇到forEach和promise
[tc39中对forEach的解释](https://tc39.es/ecma262/#sec-array.prototype.foreach)我们可以知道，forEach底层是由while来实现的。

```js
const add = (x) => new Promise((resolve) => setTimeout(() => resolve(x + x), 1000));
// forEach 底层实现 while
const test = () => {
  const list = [1, 2, 3];
  list.forEach(async (item) => {
    const res = await add(item);
    console.log(res);
  })
}
```

### 当setTimeout写动画
