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
// http请求超时参考代码
function timeout(fn, ms) {
  const mainPromise = fn();
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject('timeout...'), ms);
  });
  return Promise.race([mainPromise, timeoutPromise]);
}


// 并发测试
const httpList = [1, 2, 3, 4];
const httpMax = 3;
let count = 0;
const httpHandle = (item) => {
  count++
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(item, '当前并发量：', count--);
      resolve();
    }, Math.random() * 2000);
  }).then(res => {
    console.log('finish', res)
  })
}
concurrent(httpList, httpMax, httpHandle)