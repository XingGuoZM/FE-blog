async function getData(){
  let data = await require('fs').readFileSync('./index.json');
  console.log(data);
  return data;
}
getData();