### 什么是递归算法
一个函数在内部调用自身本身

### 使用场景
1. 基本数据结构的遍历，例如树的遍历
2. 循环遍历的替代方案，例如从1到100的叠加等
3. 


### 示例  
1. 递归实现从1到100叠加
```js

/**
 * 循环法
 * @param {*} count 
 */
function add1(count) {
  let ans = 0;
  for (let i = 0; i <= count; i++) {
    ans += i;
  }
  return ans;
}

/**
 * 递归法
 * @param {*} count 
 */
function add2(count) {
  if (count === 0) return 0;
  count--;
  return add2(count) + count + 1
}


// 测试
let ans = add2(2);
console.log(ans);
```

### 递归优化相关
什么叫尾递归？尾递归优化？


### 问题汇总(FAQ)
1. 尾递归优化

### 参考
- [尾调用优化](https://www.ruanyifeng.com/blog/2015/04/tail-call.html)



