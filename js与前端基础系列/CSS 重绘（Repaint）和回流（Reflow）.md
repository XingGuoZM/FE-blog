### 什么是重绘（Repaint）？什么是回流（重排）（Reflow）？
回流：
触发条件：当我们对 DOM 结构的修改引发了 DOM 几何尺寸发生变化的时候，就会发生回流的过程。
例如一下几个操作：

一个 DOM 元素的几何变化，常见的几何属性 width、height、padding、margin、left、top、border 等等
使 DOM 节点发生 增减 或 移动。
读写 offset 族，scroll 族 和 client 族属性的时候，浏览器为了获取这些值，需要进行回流操作。
调用 window.getComputedStyle 方法。
回流过程：由于 DOM 的结构发生了改变，所以需要从生成 DOM 这一步开始，重新经过 样式计算、生成布局树、建立图层树、再到 生成绘制列表 以及之后的显示器显示这一整个渲染过程走一遍，开销是非常大的。

重绘：
触发条件：当 DOM 的修改导致了样式的变化，并且没有影响几何属性的时候，会导致 重绘。
重绘过程：由于没有导致 DOM 几何属性的变化，因此元素的位置信息不需要更新，所以当发生重绘的时候，会跳过 生成布局树 和建立图层树的阶段，直到生成绘制列表，然后继续进行分块、生成位图等后面一系列操作。

### 如何避免触发回流和重绘：
1. 避免频繁的使用 style，而是采用修改 class 的方式。
2. 将动画效果应用到 position 属性为 absolute 或 fixed 的元素上
3. 也可以先为元素设置 display:none，操作结束后再把它显示出来，因为在 display 属性为 none 的元素上进行 DOM 操作不会引发回流和重绘
4. 使用 createDocumentFragment 进行批量的 DOM 操作。
5. 对于 resize、scroll 等进行防抖/节流处理
6. 避免频繁的读取会引发回流/ 重绘的属性，如果确实要多次使用，就用一个变量缓存起来
7. 利用 CSS3 的 transform 、opacity、filter 这些属性可以实现合成的效果，也就是 CPU 加速。

### 参考  
- [CSS重绘和重排(回流)](https://www.cnblogs.com/mdr86553/p/12048742.html)  
- [2020前端近期面试题整理](https://blog.csdn.net/kkm486622296/article/details/106063151)  