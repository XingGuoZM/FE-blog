function mockHttp(ms, mockData) {

  return new Promise(resolve => {
    setTimeout(resolve, ms);
  }).then(res => {
    return mockData;
  })
}

const getData = async () => {
  const res = await mockHttp(1000, { name: 'hello' })
  console.log('res', res);
}

getData();

