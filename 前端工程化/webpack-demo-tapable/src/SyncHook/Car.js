import { SyncHook } from 'tapable';

export default class Car {
  constructor() {
    this.startHook = new SyncHook();
    this.accelerateHook = new SyncHook(['newSpeed'])
  }
  start() {
    this.startHook.call();
  }
  accelerate(speed) {
    this.accelerateHook.call(speed);
  }
}