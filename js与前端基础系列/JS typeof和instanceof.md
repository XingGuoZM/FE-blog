
### 解释
- typeof:判断基本类型
    1. 对于基本类型，除 null 以外，均可以返回正确的结果。
    2. 对于引用类型，除 function 以外，一律返回 object 类型。
    3. 对于 null ，返回 object 类型。
    4. 对于 function 返回 function 类型。
```js
    typeof null // "object"
    typeof Object // "function",由此类推Number、String、Boolean
```
- instanceof：判断引用类型的实例

![](https://raw.githubusercontent.com/chenfengyanyu/my-web-accumulation/master/images/typeof/proto.jpeg)

### 示例
```
let num=123;
let User = function(){};
let Cat = function(){};
let u=new User();
let c=new Cat();

console.log(typeof num==='number'); // true
console.log(u instanceof User);  // true
console.log(u instanceof Cat);  //false
```

### 参考
- [JS 基础｜搞懂 typeof 和 instanceof](http://jartto.wang/2019/01/17/js-typeof/)