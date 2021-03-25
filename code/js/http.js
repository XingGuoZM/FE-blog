// http请求重试
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
// http请求并发
function concurrent() {

}
// http请求超时
function timeout(fn, ms) {
  const mainPromise = fn();
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject('timeout...'), ms);
  });
  return Promise.race([mainPromise, timeoutPromise]);
}