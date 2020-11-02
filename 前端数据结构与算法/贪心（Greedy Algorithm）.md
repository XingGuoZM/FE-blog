
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
var money= [20,10,5,1];
 /*
  * m[]:存放可供找零的面值，降序排列
  * n:需要找零数
  */
 function greedyMoney(m,n){
  for(var i=0;i<m.length;i++){
    while(n>=m[i] && n>0){
    document.write(m[i]+" ");
    n = n-m[i];
    }
  }
  document.write("<br>");
  }
  greedyMoney(money,73);
  greedyMoney([25,10,1],63);
```
### 参考
- [JavaScript 动态规划 & 贪心算法](https://juejin.im/post/6844903895748067341)
- [JS-贪心算法](https://www.cnblogs.com/orxx/p/10301144.html)  
- [JS基于贪心算法解决背包问题示例](https://www.jb51.net/article/129173.htm)
- [JS使用贪心算法解决找零问题示例](https://www.jb51.net/article/129177.htm)
- [小白带你学---贪心算法（Greedy Algorithm)](https://zhuanlan.zhihu.com/p/53334049)