import { SyncBailHook } from 'tapable';

export default class Car {
  constructor() {
    this.hooks = {
      brake: new SyncBailHook(),
    }
  }
  brake() {
    this.hooks.brake.call();
  }
}