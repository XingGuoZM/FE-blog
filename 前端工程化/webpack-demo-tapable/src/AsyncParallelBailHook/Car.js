import { AsyncParallelBailHook } from 'tapable';

export default class Car {
  constructor() {
    this.hooks = {
      drift: new AsyncParallelBailHook()
    }
  }
  drift(cb) {
    this.hooks.drift.callAsync(cb);
  }
}