
/**
 * javascript 实现一个带并发限制的异步调度器，保证同时最多运行2个任务
 */

class Scheduler{
  constructor(){
    this.waitTasks = [];
    this.runningTasks = [];
    this.resolve=null;
  }
  add(task) {
    return new Promise((resolve,reject)=>{
      task.resolve = resolve;
      if(this.runningTasks.length < 2){
        this.run(task);
      } else {
        this.waitTasks.push(task);
      }
    });
  }
  run(task) {
    this.runningTasks.push(task);
    task().then(()=>{
      task.resolve();
      this.remove(task);
      if(this.waitTasks.length>0){
        this.run(this.waitTasks.shift());
      }
    })
  }
  remove(task){
    let index = this.runningTasks.indexOf(task);
    this.runningTasks.splice(index,1);
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