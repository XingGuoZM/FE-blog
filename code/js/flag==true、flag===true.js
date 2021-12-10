
/**
 * 测试方式一：
 * console.time()
 */

// let flag = true;
// let i;
// const MAX_NUM = 1000

// i = 0;
// console.time('flag');
// while (i < MAX_NUM) {
//   i++;
//   if (flag) { }
// }
// console.timeEnd('flag');

// i = 0;
// console.time('flag==true');
// while (i < MAX_NUM) {
//   i++;
//   if (flag == true) { }
// }
// console.timeEnd('flag==true');


// i = 0
// console.time('flag===true');
// while (i < MAX_NUM) {
//   i++;
//   if (flag === true) { }
// }
// console.timeEnd('flag===true');


/**
 * 测试方式二：
 * process.uptime()
 */
// let flag;
// const start1 = process.uptime();
// if (flag) { }
// const end1 = process.uptime();
// console.log((end1 - start1) * 100000);

// const start2 = process.uptime();
// if (flag == true) { }
// const end2 = process.uptime();
// console.log((end2 - start2) * 100000);

// const start3 = process.uptime();
// if (flag === true) { }
// const end3 = process.uptime();
// console.log((end3 - start3) * 100000);


/**
 * 测试方式四：
 * new Date().getTime()或Date.now();
 */
// let flag;
// let i;
// const Max = 100000000
// i = 0;
// const start1 = new Date().getTime();
// while (i < Max) {
//   i++;
//   if (flag) { }
// }

// const end1 = new Date().getTime();
// console.log(end1 - start1);

// i = 0;
// const start2 = new Date().getTime();
// while (i < Max) {
//   i++;
//   if (flag == true) { }
// }

// const end2 = new Date().getTime();
// console.log(end2 - start2);

// i = 0;
// const start3 = new Date().getTime();
// while (i < Max) {
//   i++;
//   if (flag === true) { }
// }
// const end3 = new Date().getTime();
// console.log(end3 - start3);

/**
 * 测试方式五
 * process.hrtime()
 */
let flag

const start1 = process.hrtime();
if (flag) { }
const end1 = process.hrtime();
console.log(end1[1] - start1[1]);

const start2 = process.hrtime();
if (flag == true) { }
const end2 = process.hrtime();
console.log(end2[1] - start2[1]);

const start3 = process.hrtime();
if (flag === true) { }
const end3 = process.hrtime();
console.log(end3[1] - start3[1]);