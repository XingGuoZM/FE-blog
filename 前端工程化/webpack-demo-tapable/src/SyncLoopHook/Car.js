import { SyncLoopHook } from 'tapable';

export default class Car {
  constructor() {
    this.hooks = {
      start: new SyncLoopHook(),
    }
  }
  start() {
    this.hooks.start.call();
  }
}