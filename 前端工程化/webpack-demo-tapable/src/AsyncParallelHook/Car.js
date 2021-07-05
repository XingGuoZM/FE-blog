import {
  AsyncParallelHook
} from 'tapable';

export default class Car {
  constructor() {
    this.hooks = {
      calculateRoutes: new AsyncParallelHook(),
    }
  }
  calculateRoutes(cb) {
    this.hooks.calculateRoutes.callAsync(cb);
  }
  calculateRoutesPromise() {
    return this.hooks.calculateRoutes.promise();
  }
}