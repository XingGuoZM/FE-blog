### 功能需求
能在本地mock数据
### 技术方案
- Promise + json文件操作

### 示例代码
```js
function mockApi(mockdata,delay){
  return new Promise(resolve=>{
    setTimeout(()=>resolve(mockdata),delay);
  });
}
```

### 参考