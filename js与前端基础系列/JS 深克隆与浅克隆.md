### 深克隆与浅克隆  
对象引用复制与否 


### 深克隆实现  
```
let obj={a:{b:'hello'}}
//方法一
JSON.parse(JSON.stringify(obj))  
//方法二

```
### 浅克隆实现  
```
let obj={a:{b:'hello'}}
//方法一
Object.assign(obj)
//方法二,直接赋值
let copyObj=obj
```