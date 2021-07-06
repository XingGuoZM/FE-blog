export default class CalculateRoutesPlugin {
  apply(car) {
    car.hooks.calculateRoutes.tapPromise('calculateRoutes', (result) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('calculate routes 1: ', result)
          resolve('beijin');
        }, 1000)
      })
    });
  }
}