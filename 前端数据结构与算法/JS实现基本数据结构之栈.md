
### 概述

栈的特点为先进后出，后进先出（LIFO：last in first out）

- push（element）：添加一个新元素到栈顶位置；
- pop（）：移除栈顶的元素，同时返回被移除的元素；
- peek（）：返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）；
- isEmpty（）：如果栈里没有任何元素就返回true，否则返回false；
- size（）：返回栈里的元素个数。这个方法和数组的length属性类似；
- toString（）：将栈结构的内容以字符串的形式返回。

### 使用数组实现栈结构
```
 function Stack(){
      this.data =[]
    
      Stack.prototype.push = function(element) {
        this.data.push(element)
      }

    
      Stack.prototype.pop = () => {
        return this.data.pop()
      }

      Stack.prototype.peek = () => {
        return this.data[this.data.length - 1]
      }

      Stack.prototype.isEmpty = () => {
        return this.data.length == 0 
      }

      Stack.prototype.size = () => {
        return this.data.length
      }

      Stack.prototype.toString = () => {
        let ans = ''
        for (let i of this.data){
          ans += i + ' '
        }
        return ans;
      }
    }
```

### 使用对象实现栈结构

### 参考
- [JavaScript实现栈结构（Stack）](https://www.cnblogs.com/AhuntSun-blog/p/12422941.html)