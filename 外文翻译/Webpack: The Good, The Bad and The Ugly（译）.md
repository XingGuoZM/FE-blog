原文地址：[Webpack: The Good, The Bad and The Ugly](https://www.north-47.com/knowledge-base/webpack-the-good-the-bad-and-the-ugly/)

## 引言
webpack，一个简单又复杂的静态模块打包工具，打包一个网页应用只需要花费10分钟到10小时不等。

## 好的方面
作为一个静态模块打包器，webpack交付一份易于你的浏览器或者node环境解析的打包代码。它可以允许用户使用构建代码的UMD或者AMD规范系统并且将其运用至图像、HTML、CSS以及更多。开发者可以创建一个模块或者更多单个片段组成的模块或者多个片段组成的一个网页应用，并服务于整体或者服务于部分。
webpack的主要的卖点之一是能按照你的选择进行修改。其丰富的插件生态系统可以增强打包器本身的大量选项。这让前端库和框架可以用它来使用自定义的方案和插件打包他们的代码，例如Angular, ReactJS and VueJS。

经过多年的发展，使用webpack变得很简单，目前我们可以接触到webpack 4版本，这个版本加入了用于区分开发环境和生产环境的多个配置文件。

![](https://www.north-47.com/wp-content/uploads/2019/02/1_WCAdMi04IFEWdngK8bkFcw.png)

图片中的例子是良好开发的概述和测试的差异对比图，但同时可以使用单个脚本构建生产就绪构建包。所有这一切都共同使webpack成为大多数js项目的可行的打包器，尤其是基于Angular或者React生态时

## 不好的方面
虽然webpack是一个很好用的js打包器，但它并不是唯一可用的。webpack中的问题来自这样一个事实，即你使用的大多数库都需要考虑在webpack打包的情况下进行工作和开发。原生模块的支持受到限制，需要你指定这些资源以及你希望在最终构建中以何种形式展现。大多数时候，任意的一个模块版本更新可能会摧毁整个项目，即使是第三方模块。

webapck学习曲线变得越来越高，这一切取决于你正在处理的项目的复杂程度以及你使用的预配置项目还是自己构建的配置。

就这篇文章而言，我不仅仅浏览了webpack文档，还阅读了大约20篇文章，大量的github上的问题。大约一年半的个人配置经验，使用Three.js, A-Frame, React, Angular和无数其他利基应用与webpack打包项目。到最后我仍然感觉略懂皮毛。

整个调试过程很丑陋，它依赖于不同库的源码映射。你可以使用webpack内置的选项或者使用你自制的插件，这永远不会有趣。加载160k代码包就会阻塞你的电脑，即使使用源码映射。

## 丑陋的方面
总而言之，当你给webpack一个机会时，你的遭遇很少会是愉快的。永远不会有用于使用和实现核心的有效的标准版本。插件不能提供帮助。每次你找到有用的东西时，新的东西就会神奇的刹车。就像试图修复一艘正在下沉的船。

![](https://www.north-47.com/wp-content/uploads/2019/02/1_1Y2a8P7rK4sOSF00kL8COQ.jpeg)

这张图片代码我平均每天使用webapck的情况，如果我的项目是狗，而webpack就是点火器。目前正在与vuejs联合使用。这是同样的故事，要么使用vue-cli和预加载配置，或者当你需要优化具体的代码集成，需要将其融入更大应用程序运行时，就会后悔没有这么做。

所有这一切最糟糕的部分可能是像webpack这样的黑盒软件的广泛使用，它在理论上是开源的，但是它一系列的库和自定义代码需要花费和博士论文一样多的时间才能正确学习。对于所有的这一切，它仍然是最好的选择之一。

## 总结
webpack作为一个打包器非常适合在多应用程序中使用。特别是如果其他人为你处理配置（Angular, React, Vue clis）。希望它会变得更好，但就像js中的其他任何东西一样，它的起源和向后兼容总是会拖累它。请为超高的学习曲线和众多挫折做好准备。如果你喜欢探索新事物，或者重新实现现有的解决方案，或者优化工作流程，可以尝试一下。