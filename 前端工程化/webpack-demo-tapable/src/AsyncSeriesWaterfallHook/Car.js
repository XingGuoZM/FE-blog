import { AsyncSeriesWaterfallHook } from 'tapable';

export default class Car {
  constructor() {
    this.hooks = {
      calculateRoutes: new AsyncSeriesWaterfallHook(['home'])
    }
  }
  calculateRoutes() {
    return this.hooks.calculateRoutes.promise();
  }
}