// 请求并发

const request = (url) => new Promise(resolve => setTimeout(() => resolve(`${url} done`), 3000));

const urls = ['url1', 'url2', 'url3', 'url4', 'url5', 'url6', 'url7', 'url8', 'url9', 'url10'];
const pool = [];
const max = 3;

const addTask = (task) => {
  // pool.push(task);
  const t = request(task);
  pool.push(t);
  t.then(res => {
    pool.splice(pool.indexOf(task), 1);
    console.log(res);
    const url = urls.shift();
    if (url) {
      addTask(url);
    }
  })
}

while (pool.length < max) {
  const url = urls.shift();
  addTask(url);
}
