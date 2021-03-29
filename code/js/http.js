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
class Scheduler {
  constructor() {
    this.waitTasks = [];
    this.runningTasks = [];
    this.resolve = null;
  }
  add(task) {
    return new Promise((resolve, reject) => {
      task.resolve = resolve;
      if (this.runningTasks.length < 2) {
        this.run(task);
      } else {
        this.waitTasks.push(task);
      }
    });
  }
  run(task) {
    this.runningTasks.push(task);
    task().then(() => {
      task.resolve();
      this.remove(task);
      if (this.waitTasks.length > 0) {
        this.run(this.waitTasks.shift());
      }
    })
  }
  remove(task) {
    let index = this.runningTasks.indexOf(task);
    this.runningTasks.splice(index, 1);
  }
  //补全代码
}
function concurrent(urls, max, callback) {

}
// http请求超时
function timeout(fn, ms) {
  const mainPromise = fn();
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => reject('timeout...'), ms);
  });
  return Promise.race([mainPromise, timeoutPromise]);
}