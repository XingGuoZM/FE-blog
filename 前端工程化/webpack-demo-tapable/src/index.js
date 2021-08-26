/**
 * SyncHook Test
 */
import Car from './SyncHook/Car';

const car = new Car();
car.startHook.tap('startPlugin', () => {
  console.log('waiting...')
});
car.start();
car.accelerateHook.tap('acceleratePlugin', (speed) => {
  console.log(`加速到${speed}`);
});
car.accelerate(100);



/**
 * SyncBailHook Test
 * 订阅多次，执行任次数可调
 */
// import Car from './SyncBailHook/Car';

// const car = new Car();
// car.hooks.brake.tap('brakePlugin1', () => console.log('brake1'));
// // 只要不想往下继续，直接return 非undefined 即可
// car.hooks.brake.tap('brakePlugin2', () => { console.log('brake2'); return 1 });
// car.hooks.brake.tap('brakePlugin3', () => console.log('brake3'));
// car.brake();


/**
 * SyncWaterfallHook Test
 * 每一步都依赖上一步的执行结果，也就是上一步return的值就是下一步的参数
 */
// import Car from './SyncWaterfallHook/Car';

// const car = new Car();
// car.hooks.accelerate.tap('acceleratePlugin1', (speed) => {
//   console.log(`加速到${speed}`);
//   return speed + 100;
// });
// car.hooks.accelerate.tap('acceleratePlugin2', (speed) => {
//   console.log(`加速到${speed}`);
//   return speed + 100;
// });
// car.hooks.accelerate.tap('acceleratePlugin3', (speed) => {
//   console.log(`加速到${speed}`);
// });

// car.accelerate(100);

/**
 * SyncLoopHook Test
 * 同步循环钩子，它的插件如果返回一个非undefined。就会一直执行这个插件的回调函数，直到它返回undefined
 */
// import Car from './SyncLoopHook/Car';
// const car = new Car();
// let index = 0;
// car.hooks.start.tap('startPlugin1', () => {
//   console.log('start...');
//   if (index < 5) {
//     index++;
//     return 1;
//   }
// });
// car.hooks.start.tap('startPlugin2', () => {
//   console.log('start success!');
// });
// car.start();


/**
 * AsyncParallelHook Test
 * Promise方式
 * callAsync,当所有插件都执行完毕的时候，被调用。
 */
// tapAsync
// import Car from './AsyncParallelHook/Car';
// const car = new Car();
// // tapAsync方式
// car.hooks.calculateRoutes.tapAsync('calculateRoutesPlugin1', (cb) => {
//   setTimeout(() => {
//     console.log('calculate routes 1');
//     cb();
//   }, 1000);
// });

// car.hooks.calculateRoutes.tapAsync('calculateRoutesPlugin2', (cb) => {
//   setTimeout(() => {
//     console.log('calculate routes 2');
//     cb();
//   }, 2000);
// });
// car.calculateRoutes(() => {
//   console.log('calculate end')
// });

// // tapPromise方式
// car.hooks.calculateRoutes.tapPromise('calculateRoutesPromisePlugin1', () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('calculate routes promise 1');
//       resolve();
//     }, 1000);
//   })
// });
// car.hooks.calculateRoutes.tapPromise('calculateRoutesPromisePlugin2', () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log('calculate routes promise 2');
//       resolve();
//     }, 2000)
//   })
// });

// car.calculateRoutesPromise().then(() => {
//   console.log('calculate promise end')
// })

/**
 *  AsyncParallelBailHook Test
 */
// import Car from './AsyncParallelBailHook/Car';

// const car = new Car();
// //插件注册的钩子执行结束后，会进行bail(熔断), 然后会调用最终的回调，无论其他插件是否执行完。
// car.hooks.drift.tapAsync('driftPlugin1', (cb) => {
//   setTimeout(() => {
//     console.log('drift 1');
//     // cb传入的参数在调用的时候能拿到，有参数说明进行了熔断（bail）
//     cb(1);
//   }, 1000)
// });

// car.hooks.drift.tapAsync('driftPlugin2', (cb) => {
//   setTimeout(() => {
//     console.log('drift 2');
//     cb();
//   }, 2000)
// });

// car.drift((result) => {
//   console.log(`ends: ${result}`);
// });

/**
 *   AsyncSeriesHook
 * 串行执行
 */
// import Car from './AsyncSeriesHook/Car';
// const car = new Car();

// // 1s后 打印‘calculate routes 1’
// // 在上面的基础上再过2s后，打印‘calculate routes 2’
// // 最后打印'ends...'
// car.hooks.calculateRoutes.tapPromise('calculateRoutesPlugin1', () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('calculate routes 1');
//       resolve();
//     }, 1000)
//   })
// });

// car.hooks.calculateRoutes.tapPromise('calculateRoutesPlugin2', () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('calculate routes 2');
//       resolve();
//     }, 2000);
//   })
// });
// car.calculateRoutes().then(() => {
//   console.log('ends...');
// });

/**
 * AsyncSeriesBailHook Test
 */
// import Car from './AsyncSeriesBailHook/Car';
// const car = new Car();
// // 1s之后打印'calculate routes 1'
// // 然后打印 'ends'
// // 不会再执行calculateRoutesPlugin2
// car.hooks.calculateRoutes.tapPromise('calculateRoutesPlugin1', () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('calculate routes 1')
//       resolve(1);
//     }, 1000);
//   })
// });

// car.hooks.calculateRoutes.tapPromise('calculateRoutesPlugin2', () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('calculate routes 2');
//       resolve(2);
//     }, 2000)
//   })
// });

// car.calculateRoutes().then(() => {
//   console.log('ends...')
// });

/**
 * AsyncSeriesWaterfallHook Test
 */
// import Car from './AsyncSeriesWaterfallHook/Car';
// const car = new Car();
// // 1s之后打印'calculate routes 1 undefined'
// // 再过2s之后打印'calculate routes 2 1'
// // 最后打印'ends...'
// car.hooks.calculateRoutes.tapPromise('calculateRoutesPlugin1', (result) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('calculate routes 1', result)
//       resolve(1);
//     }, 1000)
//   })
// });

// car.hooks.calculateRoutes.tapPromise('calculateRoutesPlugin2', (result) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('calculate routes 2', result);
//       resolve(2);
//     }, 2000)
//   })
// });

// car.calculateRoutes().then(() => {
//   console.log('ends...');
// });


/**
 * Plugin Test
 * 插件封装
 */
import Car from './AsyncSeriesHook/Car';
import Calculate from './plugin/calculateRoutes';
const car = new Car();
const calculate = new Calculate();

calculate.apply(car);

car.calculateRoutes().then(() => {
  console.log('ends...');
});
