// 模拟一个http请求参考代码
function mockHttp(ms, mockData) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  }).then(res => {
    console.log(res);
    return mockData;
  })
}

let requestCtr = 0;
// 测试
const getData = async () => {
  let req = requestCtr;
  req += 1;
  const res = await mockHttp(1000, { name: 'hello' });

  console.log('res', res);
}


// 请求加锁


getData();

