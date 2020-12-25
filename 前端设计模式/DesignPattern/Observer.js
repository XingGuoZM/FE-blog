/**
 * 观察者模式
 */

/**
 * 观察者
 */
function Observer(id) {
  this.id = id;
  this.update = (obs) => {
    console.log('观察者:'+this.id);
    console.log('被观察者:'+obs.id);
  }
}
/**
 * 被观察者
 */
function Observed() {
  this.observers = [];
  this.addObserver = (obs) => {
    this.observers.push(obs);
  }
  this.removeObserver = (obs) => {
    this.observers = this.observers.filter(item=>item.id!==obs.id);
  }
  this.notify = (obs) => {
    this.observers.forEach(item=>item.update(obs));
  }
}

// 测试
const observed = new Observed();

const observer1 = new Observer(1);
const observer2 = new Observer(2);
const observer3 = new Observer(3);

observed.addObserver(observer1);
observed.addObserver(observer2);
observed.addObserver(observer3);

observed.notify(observer1);
