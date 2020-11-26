## Promise作用
Promsie是js异步处理的一种解决方案

### promise最重要的特点（非常重要）
1. 状态不可变，不可逆，不中断，只能由pending到fulfilled或者pending到rejected
2. 链式调用和值无阻塞传递，即前面无论失败与否都会执行下一步
3. 

```js
//3个状态：pending、fullfilled、rejected。

new Promise((resolve,reject)=>{
  resolve()
}).then(res=>{

}).catch(err=>{

})
```

#### then和catch方法  
- Promise 的状态一经改变就不能再修改。
- .then 和 .catch 都会返回一个新的 Promise。
- catch 不管被链接到哪里，都能捕获上层未捕捉过得错误。
- 在 Promise 中，返回一个任意的 非 Promise 的值 都会被包裹成 Promise 对象，例如 return 2 会被包装成 return Promise.resolve(2)。
- Promsie 的 .then 或者 .catch 可以被调用多次，但如果 Promise 内部的状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch的时候都会直接拿到该值。
- .then 或者 .catch 中 return 中 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获。
- .then 或 .catch 返回的值不能是 Promise 本身，否则会造成死循环。
- .then 方法是可以接收两个参数的，第一个是处理成功的参数，第二个是处理失败的参数，再某些时候你可以认为 catch是 .then 第二个参数的简便写法。
- .then 或 .catch 的期望参数是函数，传入非函数会发生值穿透。  

#### finally方法  
- .finally() 方法也是返回一个 promise，他在 Promise 结束的时候，无论结果为 resolved 还是 rejected，都会执行里面的回调函数。  
- .finally() 方法的回调不接受任何的参数，也就是说在 .finally() 函数中是没法 知道 Promise 的最终态是 resolved 还 rejected。  
- 它最终返回的默认是一个 上一次的 Promise 对象值，不过如果抛出的是一个异常，则是返回 异常的 Promise 对象。

#### all及race方法  
- Promise.all() 可以将多个Promise实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被 reject 失败状态的值，例如一个页面要分了多个异步请求去加载数据 ，那必须要等数据全部成功返回，页面才会成功显示。
- Promise.race() 的作用也是接收一组异步任务，然后执行异步任务，只保留第一个执行完成的异步操作结果，其他的方法仍在执行，不管结果如何会被抛弃。比如有几个 异步请求同时去访问一个 图片，最先获取的则直接返回，其他的则无用了。
- Promise.all().then() 结果中的数组的顺序和 Promise.all() 接收到的数组顺序一致。
all 和 race 传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被 then 的第二个参数或者后面的 catch 捕获，但不会影响数组中其他的异步任务的执行。



## promise解决了什么问题  
把异步操作的回调函数嵌套问题变成了异步操作的链式调用

## promise存在什么问题
1. promise没有提供取消异步操作的方法，例如我们new了一个promise，状态只能从pending变为resolve或者reject，没有办法取消这个promise。

## 实现一个简易的promise  
本示例只是实现了最简单的同步和异步操作，并没有完成then 的链式调用&值穿透特性，还有promise的一些方法，all、race等也没完成。我觉得手写promise是对promise有更深入的了解和学习，并不一定要复制一个一摸一样的promise，毕竟我们只要理解其原理，能够尽可能帮助我们完成工作。其实要实现链式调用也很简单，只需要在then方法最后返回一个promise，如此即可链式调用。all方法也挺简单，all方法接收一个promise数组，我们定义一个数组存储所有项的返回值，等到所有都返回了再resolve一下，难点就在于怎么判读所有promise都执行完成都返回值了呢？很简单，我们可以通过我们定义的数组的length和all参数个数进行对比就能完成了。
```js
class MyPromise{
  constructor(fn){
    this.status='pending';
    this.value=''
    this.reason=''
    //成功的回调
    this.onResolveCBs=[]
    //失败的回调
    this.onRejectCBs=[]

    let resolve=(reason)=>{
      if(this.status=='pending'){
        this.status='fulfilled';
        this.reason=reason;
        this.onResolveCBs.forEach(fn=>fn())
      }
    }

    let reject=(value)=>{
      if(this.status=='pending'){
        this.status='rejected'
        this.value=value;
        this.onRejectCBs.forEach(fn=>fn())
      }
    }
    
    try{
      fn(resolve,reject);
    }catch(e){
      reject(e)
    }
  }

  then(onResolve,onReject){
    if(this.status==='fulfilled'){
      onResolve()
    }
    if(this.status==='rejected'){
      onReject();
    }
    if(this.status==='pending'){
      this.onResolveCBs.push(()=>onReject(this.value));
      this.onRejectCBs.push(()=>onReject(this.reason))
    }
  }
}


new MyPromise((resolve,reject)=>{
  setTimeout(()=>{
    resolve()
  },2000)
  // reject()
}).then(res=>{
  console.log('成功')
},err=>{
  console.log('失败')
})
```

### 问题汇总（FAQ）


#### 参考  
* [MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)  
- [promise源码](https://github.com/then/promise/blob/master/src/core.js)  
- [2020前端近期面试题整理](https://blog.csdn.net/kkm486622296/article/details/106063151)  
- [面试官：“你能手写一个 Promise 吗”](https://zhuanlan.zhihu.com/p/183801144)
- [Promises/A+](https://promisesaplus.com/)
- [javascript基础修炼(7)——Promise，异步，可靠性](https://www.cnblogs.com/dashnowords/p/9709477.html)
- [Promise详解与实现（Promise/A+规范）](https://www.jianshu.com/p/459a856c476f)