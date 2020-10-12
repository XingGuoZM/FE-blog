### 单位释义
- px 
- em/rem
```
em:相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。
rem:仍然是相对大小，但相对的只是HTML根元素
```
- vw/vh 和 vmin/vmax

    - vw    1vw = 视口宽度的1%
    - vh	1vh = 视口高度的1%
    - vmin	选取vw和vh中最小的那个
    - vmax	选取vw和vh中最大的那个

```
    vh和vm总是与视口的高度和宽度有关，与之不同的，vmin和vmax是与这次宽度和高度的最大值或最小值有关，取决于哪个更大和更小。例如，如果浏览器设置为1100px宽、700px高，1vmin会是7px,1vmax为11px。然而，如果宽度设置为800px，高度设置为1080px，1vmin将会等于8px而1vmax将会是10.8px著作权归作者所有。
```
- ex/ch
```
ex和ch单位，与em和rem相似，依赖于当前字体和字体大小。然而，与em和rem不同的是，这两个单位只也依赖于font-family，因为它们被定为基于特殊字体的法案。

ch单位，或者字符单位被定义为0字符的宽度的“先进的尺寸”。在"Eric Meyer's的博客"中可以找到一些非常有趣的讨论关于这意味着什么，但是基本的概念是，给定一个等宽字体的字体，一个N个字符单位宽的盒子，比如width：40ch;,可以一直容纳一个有40个字符的应用那个特定字体的字符串。虽然这个特殊规则的传统用途与列出盲文有关，但是这里创造性的可行性一定会超越这些简单的用途。

ex单位被定义为"当前字体的x-height或者一个em的一半"。给定的字体的x-height是指那个字体的小写x的高度。通常，这是这个字体的中间的标志
```

### 参考
- [七个你可能不了解的CSS单位](https://www.w3cplus.com/css/7-css-units-you-might-not-know-about.html)
- [px、em、rem区别介绍](https://www.runoob.com/w3cnote/px-em-rem-different.html)
- [vh,vw单位你知道多少？](https://juejin.im/entry/6844903494386712589)