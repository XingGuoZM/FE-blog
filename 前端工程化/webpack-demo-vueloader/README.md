## vue-template-compiler
目录：/templateCompiler/index.js
将html模版字符串编译成js代码（包含ast和渲染函数的代码）
切到该目录下，执行命令
```
node index.js
```
可查看返回的数据结构
```json
{
  "ast": {
    "type": 1,
    "tag": "h1",
    "attrsList": [],
    "attrsMap": {},
    "rawAttrsMap": {},
    "children": [
      {
        "type": 3,
        "text": "hello world",
        "static": true
      }
    ],
    "plain": true,
    "static": true,
    "staticInFor": false,
    "staticRoot": false
  },
  "render": "with(this){return \_c('h1',[_v(\"hello world\")])}",
  "staticRenderFns": [],
  "errors": [],
  "tips": []
}
```
