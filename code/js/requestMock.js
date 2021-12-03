const queryData = () => {
  const randomTime = Math.ceil(Math.random() * 10) * 100;
  console.log(randomTime)
  return new Promise(resolve => setTimeout(() => resolve(randomTime), randomTime))
}
const getData = async () => {
  let res = null
  res = await queryData();
  res = await queryData();
  res = await queryData();
  return res;
}
let requestCtr = 0;
const mockData = async () => {
  let req = requestCtr;
  req += 1;
  const res = await getData();
  if (req !== requestCtr + 1) return;
  console.log('res', res);
}

mockData();