//模拟增删改查server
const fs = require('fs');



const query = async function ({ src }) {
  const fileStream = await fs.readFileSync(src);
  const arr = JSON.parse(fileStream);
  console.log(JSON.stringify(arr));
}
const del = async function ({ src, id }) {
  const fileStream = await fs.readFileSync(src);
  const arr = JSON.parse(fileStream);
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      res = arr.splice(i, 1);
      break;
    }
  }
  console.log(JSON.stringify(res));
}
const add = async function ({ src, dst, item }) {
  const fileStream = await fs.readFileSync(src);
  const arr = JSON.parse(fileStream);
  arr.push(item);
  await fs.writeFileSync(dst, JSON.stringify(arr));
}
const edit = async function ({ src, dst, id, item }) {
  const fileStream = await fs.readFileSync(src);
  let arr = JSON.parse(fileStream);
  arr = arr.map(ele => {
    if (ele.id === id) return item;
    return ele;
  });
  await fs.writeFileSync(dst, JSON.stringify(arr));
}
query({ src: './mock.json' });
del({ src: './mock.json', id: 1 });
add({ src: './mock.json', dst: './mock.json', item: { id: 2, name: 'tom' } });
edit({ src: './mock.json', dst: './mock.json', id: 2, item: { id: 2, name: 'lusy' } });

