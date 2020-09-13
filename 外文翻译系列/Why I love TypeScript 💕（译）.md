原文地址：[Why I love TypeScript 💕](https://dev.to/smithg09/why-i-love-typescript-4jdc)   

距离我刚开始写JavaScript应用程序已经2年了，而JavaScript成为我的首选语言.一年前我在一家名为[InVideo](https://invideo.io/)的令人疯狂的创业公司实习。有人告诉我要学习Angular，这使我学习了Typescript。 它是由Microsoft支持的一种开源语言。 老实说，学习angular和typescript并不容易，但最终喜欢上了它。 一年后的今天，我已经在各种规模的项目中使用了大量的TypeScript，无论是React还是NodeJS。  

让我们集中讨论为什么这是我的默认的首选语言以及为什么我更喜欢使用TypeScript而不是JavaScript编写代码。

## TypeScript-具有超能力的JavaScript
信不信由你，但是typescript在实际运行代码之前捕获错误并提供了修复程序，从而节省了我很多时间。

让我们一起看看如何

![](https://res.cloudinary.com/practicaldev/image/fetch/s--JfOlpGy8--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/yqs0wf1qg4jnhkz4plkg.PNG)


您看到红色的下划线了吗？ 这就是TypeScript给我们的提示，即在编写代码时出现了问题。
您可能已经发现这里出了什么问题。 user方法接收的是数字而不是一个字符串。

这就是为什么我喜欢TypeScript❤的原因。

继续，typescript不仅仅是类型检查。 我每天使用的最重要的功能是装饰器和接口

### 装饰器

装饰器是一种特殊的声明或方法，可以附加到类，方法，属性或任何参数上。 装饰器使用@decorator_name，其中decorator_name必须评估为一种方法，该方法将在运行时使用有关装饰声明的信息进行调用。

![](https://res.cloudinary.com/practicaldev/image/fetch/s--hr1jxvLv--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/malb3e064mzoy7jkttox.PNG)


### 接口

为JavaScript对象提供类型约束。接口是一种强大的方法，它能在代码内定义契约，并且通过契约能和你外部的项目的代码相关联。

![](https://res.cloudinary.com/practicaldev/image/fetch/s--B9jD62qN--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/jlw72gkww4m2bjh5o0by.PNG)

Typescript与VS Code搭配使用效果很好。 无论如何，官方的Typescript文档是详细学习该语言的好方法。

## 如何开始Typescript  
它作为npm注册表上的软件包（可作为“typescript”使用）提供。

在Node.js环境中必须运行该软件包。 然后可以使用npm、yarn这样的依赖管理器将TypeScript下载到您的项目中。
```
npm install -g typescript --save-dev
```
然后，您可以使用以下命令运行TypeScript编译器：
```
npx tsc
```
现在我们初始化一个新的typescript项目，可以使用如下命令：
```
tsc --init
```

最后，你应该配置TypeScript

![](https://res.cloudinary.com/practicaldev/image/fetch/s--WZLpdAWe--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/x98hud8warbke5gbal7u.PNG)

现在，您所需要做的就是创建一个.ts文件，并开始用Typescript编写代码。 完成后，您可以使用以下命令将.ts文件编译为.js
```
tsc filename.ts
```

太棒了 🎉，现在你可以使用TypeScript构建一些很棒的东西了。

如果你已经使用过它并且想在你的NodeJs应用中开始使用typescript。我有一个Nodejs/Typescript入门应用，它基于express服务，包含GraphQL，MongoDB和jest测试框架.如果你喜欢这个项目，记得离开的时候给个star🌟

[Github Repository : nodejs-typescript-graphql-starter](https://github.com/smithg09/nodejs-typescript-graphql-starter)

## 总结

这就是为什么我喜欢TypeScript。 基本上，Typescript允许您编写更好，更简洁，高效和可维护的代码。 显然，您不必刚开始就使用TypeScript的装饰器，接口或类。 最初，我仅将TypeScript用于小型项目的类型检查。 逐渐地，您可以开始添加越来越多的功能。

我希望这篇文章可以帮助您决定是否应该尝试一下，并且强烈建议您开始使用它。

感谢您的阅读，敬请期待！ ❤

查看我的网站[smithgajjar.me](https://smithgajjar.me/)
在[LinkedIn](https://www.linkedin.com/in/smith-gajjar-5a27716b/)上关注我