
/**
 * javascript 实现一个带并发限制的异步调度器，保证同时最多运行2个任务
 */

class Scheduler{
  constructor(){
    this.waitTasks = [];
    this.runningTasks = [];
  }
  add(promiseCreator){
    
  }
  //补全代码
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve,time);
});

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
}
addTask(400,4);
addTask(200,2);
addTask(300,3);
addTask(100,1);