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
console.log(1)
new Promise(resolve => resolve()).then(() => console.log(3));

Promise.resolve().then(() => console.log(2));

setTimeout(() => { console.log(4) }, 500);
const prev = +new Date();
while (+new Date - prev < 1000) {

}
console.log(5);