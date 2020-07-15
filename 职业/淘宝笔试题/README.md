### 第一题    
```
/**
 * 1.阿里数
 * 寻找100以内的阿里数
 * 阿里数的定义：对一个整数每一位求平方和，求出数字a，再对a进行上述操作，最终和等于1的数。比如：数字82就是一个阿里数：
 * 8*8+2*2=68
 * 6*6+8*8=100
 * 1*1+0*0+0*0=1
 *
 * 题意：
 * 操作各位数求平方和
 * 操作最后一步能等于1，10，100，1000....
 * 
 */
```
### 题解  
```
function aliNumber(number){
  let ans=[]
  for(let i=0;i<100;i++){
    if(squareNumber(squareNumber(squareNumber(i)))===1){
      ans.push(i)
    }
  }
  console.log(ans)
  return ans
}
// 获取数位,并求平方和
function squareNumber(number){
  if( number && typeof number == 'number'){
    return (number+'').split('').map(item=>item*item).reduce((prev,curr)=>prev+curr)
  }
  return false;
}
console.log(aliNumber(100))
```
### 补充  
- 封装成compose之后可以自定义操作次数，而不限于3次。也可以自定义范围，而不限于100以内  



### 第二题：react-taobao  
```
 /**
  * 2.使用react+react-hooks实现一个轮播组件
  * 要求实现：
  * a.无限滚动
  * b.左右按钮切换
  * c.锚点控制
  */
```
### 题解  
```
react-taobao
```

### 开发遇到问题汇总
+ 目前存在滚动动画的bug（2020-7-15）  
  - js怎么操作keyframe(试了一下，成本较高)  
  - 使用requestAnimationFrame完成动画效果(试了一下，误差较大)  
  - setInterval（试了一下，无法修改state）,bug一般的存在  


### 里程碑  
+ 2020-7-14
  - 100以内阿里数基本完成，准备进行扩展，利用洋葱模型完成自定义操作次数和自定义范围的最终版  
  - react 和 react-hooks轮播组件基本完成，可以通过传数组完成自定页数，目前存在滚动动画的bug（js动态操作css的keyframe、requestAnimationFrame和定时器都试了，都存在这样那样的问题。）  
  - 准备15号把上面两道题进行优化提取核心并写blog分享  