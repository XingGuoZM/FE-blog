const queryData = (data) => {
  return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
}

const getData = () => {
  return queryData(123).then(res => {
    return res;
  }).catch(e => {
    console.log(e)
  })
}

getData().then(res => {
  console.log(res);
});
