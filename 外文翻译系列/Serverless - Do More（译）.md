原文地址：[Serverless - Do More](https://www.codementor.io/@chrisquinn299/serverless-do-more-nclf7ere5) 

![Serverless - Do More](https://process.filestackapi.com/cache=expiry:max/resize=width:1050/ojaRKBq1TkGZHeQU3s6Q) 

该文是我在2017年为Gravitywell写的文章的转载（这是原文）  

最近我在看Serverless,这是一个用于创建、部署和监控serverless应用和功能的框架。

目前，微服务风靡一时，但在炒作背后是关于使用分布式方法代替“整体”的适用性的激烈辩论（请参阅本文末尾的建议阅读）。 在为Gravitywell Labs做一些研发的同时，我花了一些时间来研究构建和部署serverless应用的过程。

简而言之：在这篇文章中，我将着重参考运行在Node.js模块上的AWS Lambda 函数。但是这些规则可以并且应该被使用，特别要注意结合托管环境和你使用的语言。

## 什么是serverless应用？  
serverless架构背后的核心思想是应用逻辑可以被分解为离散的独立的函数。理想情况下，每个函数都是无状态的，无需了解任何同级函数、应用状态或外部依赖。

在任何时候，每个函数都可以被调用或被委托。但是当不使用它们的时候，它们将处于休眠状态并且不会消耗任何资源。

亚马逊Web服务的这张图表可以解析:

![Lambda_HowItWorks.png](https://process.filestackapi.com/cache=expiry:max/2Mu9z7NxQBu93b5MMhT5)  

## 为什么是serverless？  
面向对象语言的问题在于它们会携带它们周围所有的隐式环境。

你想要一个香蕉，但是你拥有的是一片丛林和一只拿着那个香蕉的大猩猩。
Peter Seibel - 工作中的编码员  

最后一句话适用于软件开发中的许多不同的情况。 客户需要注册表单，我们给了他们CMS。销售团队想要该月的总销售额，我们为他们提供了BI工具。软件团队承担过多的工程风险，通常最简单的解决方案可以提供最大的回报。 serverless架构可以简化解决方案，而无需增加冗余的其他东西（拿着香蕉的大猩猩）。  

## serverless只是另外一个流行术语吗？
```  
下一次你尝试使用"serverless"这个词的时候，请记住，这就像外卖店的"无厨房"一样。  
凯特·皮尔斯-@secvale  
```

在某些时候，一个请求到达你的Lambda函数代码，最终也会在服务器上运行。我听见你说“假的”。但是，说实话，这仅仅是一个术语 - 我们也可以称之为Jeff。有评论者也指出当你把所有的鸡蛋放到AWS篮子上时，供应商锁定的陷阱。

我对此的看法是，即使serverless方法已经存在很久了（CGI有人吗？），但炒作是真实的- 即使我们呢提供可行的解决方案非常繁琐，也有大量性价比很高的云服务器触手可及。在设计基于web的事件驱动的解决方案时，我们值得将独立个体或'臃肿'的应用考虑进来。

## Serverless， 开始吧！  
为了从纯技术到纯商业的转变，这是使用serverless的5个益处。

1. 参照透明，可复用函数  
2. 易于集成自动化测试和部署  
3. 更大的可扩展性  
4. 更快上线  
5. 降低成本  

让我们依次介绍这些。

### 参照透明，可复用函数  
serverless方法与函数式编程之间有许多相似之处。将你的应用分解成细小的离散的部分（或纯函数）。您可以以可示范且可重复的方式显式声明，测试和控制应用程序的逻辑。

Eric Elliot，一个比我懂得多的多的开发者，我将让他来指明方向：
```
当您避免共享的状态时，函数调用的时间和顺序不会改变调用函数的结果。 使用纯函数，只要输入相同，您将始终获得相同的输出。 这使得函数调用完全独立于其他函数调用，从而可以从根本上简化更改和重构。 一个函数的更改或函数调用的时间不会影响并破坏程序的其他部分。
Eric Elliot - Javascript Scene
```

纯函数不会改变你的应用里的任何东西，但是会在给出相同输入的情况下每次都会输出相同的结果。

问题是，我们可能非常想改变一些有关应用的状态信息，例如，写入数据到数据存储区。例如，如果我们其中一个离散函数的任务是从数据库中删除一条记录，然后它不能真正的称为一个纯函数，因为它改变了我们应用程序的状态。然而，可以将它称之为幂等函数，因为在提供唯一标识符的情况下，无论执行多少次命令，最终的结果始终是相同的。

好吧，文章瞬间变得繁重，不是吗？

![inception-architecture.jpg](https://process.filestackapi.com/cache=expiry:max/HI9r5N8wTrSi1BV8ZK5S)

这是最关键的地方：纯函数和/或幂等函数可以帮助我们写可靠的单元测试，因为你的函数行为可以预测，在原有基础上更加整洁。

### 易于集成自动化测试和部署 
自动化单元测试是使用serverless应用的绝对的必要的条件，为什么呢？  

一个无状态的函数（在我们这里是一个Lambda函数）是一个较大进程、事务或者系统里的一小部分。但是，这并不意味着我们因此就将其视为二等公民，我们需要像对待应用程序中的任何类或者模块一样，以同样的关注度来开发和测试该函数。

事实上，我们没有任何理由不对Lambda函数进行单元测试，因为他们是无状态的并且不需要任何的特殊条件即可运行。

在我们的案例当中（Node / AWS Lambda），我们可以通过简单几行来连续的运行单元测试。
```
npm -i nodeunit onchange

npm -i husky --save-dev
```

并确保将以下脚本添加到package.json  
```
 "scripts": { 
  "precommit": "npm test", 
  "prepush": "npm test", 
  "start": "npm run handler.js", 
  "test": "nodeunit ./tests", 
  "watch": "onchange './tests/*.js' 'handler.js' './lib/*.js' -- npm test" 
}
```

假设你有一个tests目录，一个'handler.js'文件和一个lib目录，onchange将监视这些文件的更改，并且每次监测到这些更改时重新运行这些测试。另外请注意，我们在提交之前和使用赫斯基的git钩子推送之前都在运行测试。

我们使用nodeunit,因为测试语法非常简单。
```
 exports.testTargets = function(test, cb){ 
  let targets = require('../lib/targets'); 
  let result = targets.fetch(); 
  test.equals(result.length, 6); 
  test.done(); 
}; 
```

从这里开始，很容易配置更新后的git钩子，以调用serverless的deploy命令将您的更改部署到AWS。  
```
{ 
 ... 
 “postupdate”: “serverless deploy function -f myFunction” 
 ... 
}
```

你总是可以通过测试并将事务部署到运行器上，像Travis 或 Circle，但这超出了我们的讨论范畴。上面的代码片段演示了你可以围绕serverless函数拥有一个健壮并且轻量的测试和部署环境。也可以通过简单的调用serverless部署的临时方案来保持手动部署的过程。

Serverless本身是一个框架，用来增强编写和部署微服务应用程序。通过与AWS-cli的紧密结合来快速触达目标，如果你已经在本地配置了AWS证书，则可以在很短的时间内完成从0配置到部署。

### 更大的可扩展性  
这个利益点是一个使用AWS Lambda隐含的部分 - 对lambda函数的请求是并行运行的，对请求数量没有实际的限制。将这种级别的可扩展性和容错性与经典的LAMP整体组件（甚至是负载均衡后面的几个实例）进行对比。要进行扩展，整体要消耗越来越多的资源。无论是横向比较，需要更多服务器实例的资源，又或者纵向比较，需要更多内存或者计算能力的资源。随着更大的运营和更多的部件的活动，整体方法需要相应更多的人力，监控和支持。

没有停机时间，没有运营窗口，也没有资源短缺问题，Lambda 函数不会受到与devops相关的大多数问题的影响。我要说的是Lambda不是web开发的灵丹妙药，实际上它们具有自己的一组操作特性（并行化上限，最大执行时间300ms），架构师的解决方案必须确定serverless方法在什么时候才是正确的方法。在相关情况下将两种方法混合在一起也是正确的。但是这里的重点是，对于serverless方法，应该着重考虑某些操作，例如REST api，文件处理或自定义分析跟踪。

最重要的是，serverless 函数非常快捷。

### 更快上线  
 我花在使用serverless的时间主要花在编写实际的业务逻辑上，而花在配置堆栈或研究Apache配置文件的时间却很少。 之前，我曾写过有关如何使用Meteor.js之类的框架使您摆脱配置Websocket的麻烦，并且仅使您能够继续构建应用程序。

同样，Serverless通过设置一个Lambda函数（和关联AWS API网关）来处理耗时的部分，并（通过AWS-cliAWS-cli）为你配置IAMs权限。

然而，关于整个serverless的事务，我最喜欢的事是？我可以在我的serverless应用中使用npm模块。这里打开了一个名副其实的开源的宝库，我们可以在应用程序中充分利用它并立即进行部署。

### 降低成本  
最后但同样重要的一点是，我们给出了使用Serverless的非技术性原因。

您的应用程序价格会更低。

开发，部署和维护所需的时间更少，运行所需的时间也更少。 如果这两点不能说服您的老板至少使用Serverless构建应用程序的一部分，那么我不知道还要做什么。

## 开始  
亚马逊网络服务提供了一套理想的技术套件来支持Serverless架构，这就是为什么serverless将AWS集成描述为堆栈的实际资源提供商的原因，尽管您可以选择Azure，IBM或Google的产品。

开始非常简单：
```
npm install serverless -g 
serverless create --template hello-world 
serverless deploy
```

我还强烈建议你点击此处从Serverless查看示例。  

[https://github.com/serverless/examples](https://github.com/serverless/examples)

## 总结  
我们开始使用Serverless是正确的。 就像2015年的Meteor一样，我们希望它可以在Gravitywell增强我们的开发流程，并与React Native和Sails.js等其他研发项目并驾齐驱。 希望您觉得这篇文章对您有帮助，让我们知道您对@gravitywelluk的看法，或者对我感兴趣@chrisquinnr。


## 深度阅读   
[http://joshsymonds.com/blog/2013/04/23/the-perils-of-overengineering/](http://joshsymonds.com/blog/2013/04/23/the-perils-of-overengineering/)

[https://aadrake.com/posts/2017-05-20-enough-with-the-microservices.html](https://aadrake.com/posts/2017-05-20-enough-with-the-microservices.html)

[http://www.russmiles.com/essais/8-ways-to-lose-at-microservices-adoption](http://www.russmiles.com/essais/8-ways-to-lose-at-microservices-adoption)

[https://en.wikipedia.org/wiki/Capability_Maturity_Model](https://en.wikipedia.org/wiki/Capability_Maturity_Model)

[https://www.oreilly.com/ideas/modules-vs-microservices](https://www.oreilly.com/ideas/modules-vs-microservices)