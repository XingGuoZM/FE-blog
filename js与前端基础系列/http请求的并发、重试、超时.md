


### 请求并发
```
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
```
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

```
// http请求超时参考代码
function timeout(fn, ms) {
  const mainPromise = fn();
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject('timeout...'), ms);
  });
  return Promise.race([mainPromise, timeoutPromise]);
}

```