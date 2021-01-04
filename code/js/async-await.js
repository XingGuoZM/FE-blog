// async function getData(){
//   let data = await require('fs').readFileSync('../json/index.json');
//   return JSON.parse(data);
// }
// getData().then(res=>{
//   console.log(res);
// });







const getData = ()=>new Promise(resolve=>setTimeout(()=>resolve('data'),1000));

// const test = async function(){
//   const data1 = await getData();
//   console.log('data1:',data1);

//   const data2 = await getData();
//   console.log('data2:',data2);
// }

// test();


const test = function* (){
  yield getData();
  yield getData();
}
const data = test().next().value;
data.then(res=>{
  console.log(res);
});
