

function sleep(time){
  let now = +new Date();
  while(+new Date() - now <= time){
  }
  return;
}
// console.log(sleep(1000));
console.log(1);
sleep(1000);
console.log(2);