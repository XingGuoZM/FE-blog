// new Promise((resolve, reject) => {
//   reject();
//   console.log(1)
// }).then(res => {
//   console.log(2)
// }, error => {
//   console.log(3)
// }).then(res => {
//   console.log(4)
// })


// console.log(1)
// new Promise(resolve => resolve()).then(() => console.log(3));

// Promise.resolve().then(() => console.log(2));

// setTimeout(() => { console.log(4) }, 500);
// const prev = +new Date();
// while (+new Date - prev < 1000) {

// }
// console.log(5);

const add = (x) => new Promise((resolve) => setTimeout(() => resolve(x + x), 1000));
// forEach 底层实现 while
// const test = () => {
//   const list = [1, 2, 3];
//   list.forEach(async (item) => {
//     const res = await add(item);
//     console.log(res);
//   })
// }
const list = [1, 2, 3];
const test = async (i) => {
  let promise;
  if (i === list.length) return;
  promise = await Promise.resolve(add(list[i])).then(x => console.log(x));
  test(i + 1)
}

test(0);

// console.log(1);
// setTimeout(() => console.log(2), 1000);
// new Promise((resolve) => resolve(3)).then(res => console.log(res));
// console.log(4);
