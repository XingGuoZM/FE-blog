/**
 * SyncHook Test
 */
// import Car from './SyncHook/Car';

// const car = new Car();
// car.startHook.tap('startPlugin', () => {
//   console.log('waiting...')
// });
// car.start();
// car.accelerateHook.tap('acceleratePlugin', (speed) => {
//   console.log(`加速到${speed}`);
// });
// car.accelerate(100);



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

