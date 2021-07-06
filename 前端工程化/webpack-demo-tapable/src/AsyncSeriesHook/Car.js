import { AsyncSeriesHook } from 'tapable';

export default class Car {
  constructor() {
    this.hooks = {
      calculateRoutes: new AsyncSeriesHook()
    }
  }
  calculateRoutes() {
    return this.hooks.calculateRoutes.promise();
  }
}