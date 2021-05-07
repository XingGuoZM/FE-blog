最近项目中用到了http请求的并发、重试和超时，虽然现有的很多库都可以直接拿来用，但是我们今天还是手动来实现一下，看看背后的实现逻辑。以后使用到的时候可以直接改造。http请求可以使用promise模拟，代码如下：

### 请求并发
```js
// http请求并发控制参考代码
function concurrent(list, max, handle) {
  const recursion = (arr) => {
    return handle(arr.shift()).then(() => {
      if (arr.length < 0) return recursion(arr);
      return 'finish';
    });
  }
  const listCopy = [].concat(list);
  let handleList = [];
  while (max--) {
    handleList.push(recursion(listCopy));
  }
  return Promise.all(handleList);
}
```

### 请求重试
```js
// http请求重试参考代码
async function retry(fn, delay, count) {
  try {
    await fn();
  } catch (e) {
    if (count > 0) {
      count--;
      setTimeout(() => retry(fn, delay, count), delay);
    }
  }
}
```

### 请求超时

```js
// http请求超时参考代码
function timeout(fn, ms) {
  const mainPromise = fn();
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject('timeout...'), ms);
  });
  return Promise.race([mainPromise, timeoutPromise]);
}

```