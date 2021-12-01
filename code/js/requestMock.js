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
  console.log('res', res);

}

getData();