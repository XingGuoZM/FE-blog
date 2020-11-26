


// function* makeRangeIterator(start=0,end=Infinity,step=1){
//   for(let i=start;i<end;i+=step){
//     yield i
//   }
// }

// let it = makeRangeIterator(1,10,2);
// it.next();
// console.log(it.next());

function makeRangeIterator(start, end, step) {
  let next = start;
  let count = 0;
  const iterator = {
    next: function () {
      let result;
      if (next < end) {
        result = { value: count, done: false };
        next += step;
        count++;
        return result;
      }
      return { value: count, done: true };
    }
  }
  return iterator;
}

// let it = makeRangeIterator(1, 10, 2);

// let ans = it.next();
// while (!ans.done) {
//   // console.log(ans.value);
//   ans = it.next();
// }

function* gen(){
  yield['1','2','3']
}
// let ans = gen().next();

// while(!ans.done){
//   console.log(ans.value);
//   ans = gen().next();
// }

console.log(gen().next());