
### 贪心算法解释
贪心算法遵循一种近似解决问题的技术，期盼通过每个阶段的局部最优选择（当前最好的解），从而达到全局的最优（全局最优解）

### 示例

- 背包问题
固定容积的背包能放入物品的总最大价值

物品 A B C D
价格 50 220 60 60
尺寸 5 20 10 12
比率 10 11 6 5

按比例降序尽可能多放入物品

```js
function greedy(values, weights, capacity){
  var returnValue = 0
  var remainCapacity = capacity
  var sortArray = []
  values.map((cur, index) =>{
    sortArray.push({
      'value': values[index],
      'weight': weights[index],
      'ratio': values[index]/weights[index]
    })
  })
  sortArray.sort(function(a, b){
    return b.ratio > a.ratio
  })
  console.log(sortArray)
  sortArray.map((cur,index) => {
    var num = parseInt(remainCapacity/cur.weight)
    console.log(num)
    remainCapacity -= num*cur.weight
    returnValue += num*cur.value
  })
  return returnValue
}
var items = ['A','B','C','D']
var values = [50,220,60,60]
var weights = [5,20,10,12]
var capacity = 32 //背包容积
greedy(values, weights, capacity) // 320
```
- 找零钱问题
在现实生活中，经常遇到找零问题，假设有数目不限的面值为20,10,5,1的硬币。 给出需要找零数，求出找零方案，要求：使用数目最少的硬币。
```js
 /*
  * m[]:存放可供找零的面值，降序排列
  * n:需要找零数
  */
 function greedyMoney(m,n){
  for(let i=0;i<m.length;i++){
    while(n>=m[i] && n>0){
      console.log(m[i]+" ");
      n = n-m[i];
    }
  }
  }
  greedyMoney([20,10,5,1],73);
  greedyMoney([25,10,1],63);
```

- 分饼干问题
假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。对每个孩子 i ，都有一个胃口值 gi ，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j ，都有一个尺寸 sj 。如果 sj >= gi ，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

注意：

你可以假设胃口值为正。
一个小朋友最多只能拥有一块饼干

示例 1:
```
输入: [1,2,3], [1,1]
输出: 1
解释: 你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
所以你应该输出1。
1
2
3
4
5
```
示例 2:
```
输入: [1,2], [1,2,3]
输出: 2
解释: 你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
你拥有的饼干数量和尺寸都足以让所有孩子满足。
所以你应该输出2.
```
代码
```js
function greedyCookie(children, cookies) {
  children.sort((a,b)=>a-b);
  cookies.sort((a,b)=>a-b);

  let count = 0;
  let child = 0;

  for(let i=0;i<children.length && child<cookies.length;i++){
    if(children[child]<=cookies[i]){
      count++;
      child++
    }
  }
  return count;
}

const ans = greedyCookie([2,1,3],[1,1]);
console.log(arr);
```

### 参考
- [JavaScript 动态规划 & 贪心算法](https://juejin.im/post/6844903895748067341)
- [JS-贪心算法](https://www.cnblogs.com/orxx/p/10301144.html)  
- [JS基于贪心算法解决背包问题示例](https://www.jb51.net/article/129173.htm)
- [JS使用贪心算法解决找零问题示例](https://www.jb51.net/article/129177.htm)
- [小白带你学---贪心算法（Greedy Algorithm)](https://zhuanlan.zhihu.com/p/53334049)