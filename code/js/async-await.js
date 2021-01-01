async function getData(){
  let data = await require('fs').readFileSync('../json/index.json');
  let res = JSON.parse(data);
  console.log(res);
  return res;
}
getData();