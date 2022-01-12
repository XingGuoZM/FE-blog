
function sleep(time, fn) {
  let now = +new Date();
  while (+new Date() - now <= time) {

  }
  fn();
}

// console.log(sleep(1000));
console.log(1);
sleep(5000, () => { console.log(2) });
setTimeout(() => { console.log(3) }, 1000);