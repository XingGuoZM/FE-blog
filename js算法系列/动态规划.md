

## 示例
 1. 斐波拉契数列
```
// 斐波拉契数列
/**
 * 
 * @param {*} n
 * 0，1，1，2，3，5，8，13，21，34，55，......
 * 当 n >= 2，an = an - 1 + an - 2 
 */
function fibo(n){
  if(n<=0) return 0;
  if(n===1) return 1;
  let arr=[0,1];
  for(let i=2;i<=n;i++){
    arr[i]=arr[i-1]+arr[i-2];
  }
  return arr[n];
}
```

### 参考
- [JavaScript 动态规划 & 贪心算法](https://juejin.im/post/6844903895748067341)