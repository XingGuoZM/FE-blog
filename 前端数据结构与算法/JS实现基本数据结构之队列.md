
### 概述

队列的特点为先进先出，先进先出（FIFO：first in first out）

- enqueue(element): 添加一个新元素到队尾;
- dequeue(): 移除队首的元素，同时返回被移除的元素;
- front(): 查看队首的元素，不对队列做任何修改（该方法不会移除队首的元素，仅仅返回它）;
- back():  查看队尾的元素，不对队列做任何修改（该方法不会移除队尾的元素，仅仅返回它）;
- clear(): 清空队列;
- empty(): 判断当前队列是否为空;
- toString(): 将队列的内容以字符串的形式返回;

### 使用数组实现队列
```js
 function Queue(){
      this.data =[]
    
      Queue.prototype.enqueue = function(element) {
        this.data.unshift(element)
      }

      Queue.prototype.dequeue = () => {
        return this.data.shift()
      }

      Queue.prototype.front = () => {
        return this.data[0]
      }

      Queue.prototype.back = () => {
        return this.data[this.data.length - 1]
      }

      Queue.prototype.clear = () => {
        this.data.length=0
      }

      Queue.prototype.empty = () => {
        return this.data.length == 0 
      }
      
      Queue.prototype.toString = () => {
        let ans = ''
        for (let i of this.data){
          ans += i + ' '
        }
        return ans;
      }
    }
```

### 使用对象实现队列

### 参考
