

### 核心代码解读  
```
function Router(opts) {
  if (!(this instanceof Router)) {
    return new Router(opts);
  }

  this.opts = opts || {};
  this.methods = this.opts.methods || [
    'HEAD',
    'OPTIONS',
    'GET',
    'PUT',
    'PATCH',
    'POST',
    'DELETE'
  ];

  this.params = {};
  this.stack = [];
};
```


### 参考  
- [koa-router源码地址](https://github.com/ZijianHe/koa-router/tree/master/lib)  
- [koa-router官方文档](https://github.com/ZijianHe/koa-router)  