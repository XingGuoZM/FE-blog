

## commit 规范
```js
git commit -m 'type(scope?): message'
```
  *  type 提交类型，取值见下节描述
  *  scope 作用域，可空
  *  message 前面的 : 为英文半角冒号，后面空一格

type类型      
  *  feat: 新增功能      
  *  fix: bug 修复      
  *  refactor: 不修复 bug 也不添加新功能的代码调整      
  *  style: 不涉及代码语义、逻辑的代码格式调整，如缩进、引号等      
  *  perf: 涉及性能提升的代码修改      
  *  test: 添加或者修改测试用例      
  *  docs: 文档修改      
  *  build: 构建相关，如修改依赖版本号、Webpack、Gulp 等配置      
  *  chore: 其他无法归类的杂项   
  *  revert: 代码回滚，如 revert: this reverts commit


### 参考
- [husky官网](https://typicode.github.io/husky/#/)