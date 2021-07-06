import { AsyncSeriesBailHook } from 'tapable';

export default class Car {
  constructor() {
    this.hooks = {
      calculateRoutes: new AsyncSeriesBailHook()
    }
  }
  calculateRoutes() {
    return this.hooks.calculateRoutes.promise();
  }
}