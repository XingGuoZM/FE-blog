import { SyncWaterfallHook } from 'tapable';

export default class Car {
  constructor() {
    this.hooks = {
      accelerate: new SyncWaterfallHook(['newSpeed']),
    }
  }
  accelerate(speed) {
    this.hooks.accelerate.call(speed);
  }
}