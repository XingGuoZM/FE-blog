### 区别  
1. 箭头函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。    
2. 箭头函数没有arguments,如果要用，可以用 rest 参数代替 (注意在node环境下是有arguments的)  
3. 箭头函数不能作为构造函数，不能使用new  
4. 箭头函数没有原型，不能继承  
5. 箭头函数不能当做Generator函数,不能使用yield关键字  

### 验证示例  
- 浏览器侧验证  
```js
  <script>
      const test1=(...numbers)=>{
          console.log(this)
          console.log(numbers)      
          console.log(arguments)
      };
      const test2=function(){
          console.log(this)
          console.log(arguments)
      }

      test1(123);//分别输出 window [123] 报错
      test2(123);//分别输出 window Arguments 
  </script>
```
- node侧验证  
```
const test1=(...numbers)=>{
  console.log(this)
  console.log(numbers)      
  console.log(arguments)
};
const test2=function(){
  console.log(this)
  console.log(arguments)
}

test1(123);//分别输出 global [123] Arguments
test2(123);//分别输出 global Arguments 
```

### 参考  
- [箭头函数与普通函数的区别](https://www.cnblogs.com/biubiuxixiya/p/8610594.html)  
- [ECMAScript 6入门 函数的扩展](https://es6.ruanyifeng.com/#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)  