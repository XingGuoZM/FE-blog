[原文地址](https://www.sitepoint.com/understanding-es6-modules/)

### 这篇文章探索ES6 modules，在编译器的帮助下展示他们如何被使用到今天

几乎每种语言都有模块的概念- 一种在另一个文件中包含功能性的声明的文件。一般的，开发者创建一个封装好的表示处理相关任务的代码库。这个库可以被其他应用或者其他模块引用。

模块的益处：
1. 代码可以被分割成更小的独立功能文件
2. 同一个模块可以被多个应用共享
3. 理想情况，模块不需要其他开发者检查其可用性，因为他们已经被证实可以运行。
4. 代码里引用一个模块可以理解这是一个依赖。如果这个模块文件修改了或者移动了，问题会立马显现。
5. 模块代码通常帮助我们彻底根除命名冲突。module1中的x()函数不会与modules2中的x()函数发生冲突。使用了类似命名空间的选项，因此调用变成了module1.x()和module2.x().

## javascript的模块在哪里
几年前开始web开发的人会惊奇的发现在JavaScript中没有模块的概念。在另一个js文件中是不可能直接引用或者包含一个JavaScript文件的。因此，开发人员寻找其他选择。

### 多个html\<script\>标签
html可以通过多个html\<script\>标签加载任意个JavaScript文件
```
<script src="lib1.js"></script>
<script src="lib2.js"></script>
<script src="core.js"></script>
<script>
console.log('inline code');
</script>
```
[在2018年，平均每个网页使用了25个分割的scripts](http://httparchive.org/trends.php#bytesJS&reqJS),但这不是一个切实的解决方案：

- 每个脚本会发起一个新的HTTP请求，这会影响页面的性能。[HTTP/2](https://www.sitepoint.com/what-is-http2/)在某种程度上缓解了这个问题，但这对其他域（例如CDN）上引用的脚本无济于事
- 每个脚本在运行时都会阻塞进一步的处理
- 依赖管理是一个人工处理的过程.在代码中，如果lib1.js引用lib2.js的代码，这部分代码可能出错，因为它没有加载。这有可能损害深层次的JavaScript程序。
- 函数可能覆盖其他函数，除非使用合适的[模块模式](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#designpatternsjavascript)。早期的JavaScript库因使用全局函数名称或覆盖原生方法而臭名昭著。