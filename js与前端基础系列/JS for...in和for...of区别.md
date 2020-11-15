### for...in
1. 遍历数组时，取到的是数组的索引
2. 遍历顺序有可能不是按照实际数组的内部顺序
3. 使用for in会遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法method和name属性
所以for in更适合遍历对象，不要使用for in遍历数组。

### for...of
1. 适用遍历数组/数组对象/字符串/map/set等拥有迭代器对象的集合，与forEach()不同的是，它可以正确响应break、continue和return语句
2. for-of循环不支持普通对象，但如果你想迭代一个对象的属性，你可以用for-in循环
3. 遍历map对象时适合用解构

### 参考
- [for in 和for of的区别](https://www.jianshu.com/p/c43f418d6bf0)