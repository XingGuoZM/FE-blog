原文地址：[What is a Polyfill?](https://remysharp.com/2010/10/08/what-is-a-polyfill)  

polyfill 或者说polyfiller是一段代码（或者插件），它可以提供给开发者们希望浏览器原生支持的技术。实现你想要的任何api。

## 是从哪里创造polyfill这个词的呢？  
2009年的时候，我正在编写[Introducing HTML5](http://introducinghtml5.com/)。我坐在咖啡店（就像你们那样）思考一个词语，它的意思是'如果浏览器本身并没有这个api，使用JavaScript（或Flash或其他什么）再造一个API'。

对于我来说，Shim的意思是你可以添加一段代码，它可以修复完善一些功能，但是大多数情况下它拥有自己的api。我想要一些可以插入的东西，它会自己默默的工作（还记得旧的shim.gif吗？实际上它要求你插入一张图片来填充空的td单元格 - 我想要一些能自动为我工作的东西）。

我知道我要做的不是逐步升级，因为我的工作是以要求使用JavaScript和最新技术为基准的，因此目前这个术语还无法为我工作。

我知道这也不是正常的降级，因为如果没有原生共嗯那个和没有Javascript（假设使用Javascript作为polyfill）的的话，它根本无法工作。

因此我想要一个简单易懂的词，并且可以大概想像出它能干什么。我只是稍微想到Polyfill这个词，但是它符合我的要求。Poly的意思是它可以使用多种技术来解决问题 - 但是它不限于使用JavaScript，并且fill的寓意可以是填补浏览器该技术的空白。它并不意味着"旧浏览器"(因为我们在新的浏览器中也需要polyfill)。

同样对我来说，Polyfilla（在美国被称为Spackling）这个产品是一种糊剂，可以粘贴到墙壁上以覆盖裂缝和孔洞。我非常喜欢用可视化的方式来说明我们是如何完善浏览器的。当墙壁填平之后，你可以随意绘画，也可以贴上满意的墙纸。

我收到一些反馈说"这个词语需要修改"，但是当时的社区更多的是需要一些名词，就像我们需要Ajax、HTML5、Web 2.0一样 - 这些打消了我们的想法。不管这些名词是否完美适合，都已证明它具有优势，并且开发者和设计师都能理解这些概念。

我从来没有故意把它放在那，我只是把它放在了几个关键的位置（书中最值得注意的地方）。我想这是在几个月后（很多？）+Paul Irish发表演讲的时候直接提到了这个名词，这才是这个术语大量曝光的时间（我认为增加Modernizr HTML5 shims 和 polyfill page也有帮助）。

## 定义  
[Alex Sexton](http://alexsexton.com/) 也[将Polyfilling归类为一种逐步升级的方式](http://twitter.com/SlexAxton/status/25600963629)。我认为总结的很好.

[Paul](http://paulirish.com/) 也[将它定义为](http://paulirish.com/i/7570.png):
```
一种模拟未来Api的填补，为旧浏览器提供后备功能.
```

## 一些例子  
这里有一个示例：sessionStorage在所有最新的浏览器（IE8及更高版本）中可用，但在IE7及以下版本中不可用。

对于不提供sessionStorage的较旧的浏览器，可以使用polyfill [插件支持]（http://gist.github.com/350433）。

另一个例子是在IE中提供canvas支持。这确实是可以看到poly部分的地方。如果没有原生的canvas，我们可以提供[canvas support using Silverlight](http://blogs.msdn.com/b/delay/archive/2009/08/24/using-one-platform-to-build-another-html-5-s-canvas-tag-implemented-using-silverlight.aspx)。如果Silverlight不可用，我们可以利用[excanvas](http://code.google.com/p/explorercanvas/)（请注意，excanvas实际上也包含了期望的的Silver桥梁）来使用VML。如果浏览器中没有原生支持，这两个脚本可以为开发者提供（相当）可靠的canvas备份。

它的起源和未来
今年年初，我与Bruce Lawson合作编写[Introducing HTML5](http://introducinghtml5.com/) 。在研发期间，我一直在研究shims和填充缺少的API的技术。但是他们不是十分明显的逐步升级。我想用一个词来表达这个想法，即有一种东西可以插入进浏览器，但不是逐步升级也不是正常降级。

Polyfill似乎很合适我想要表达的（在我的脑海中！）。

Ployfilla是英国的一种产品，在美国被称为Spackling Paste。牢记这一点：将浏览器视为一堵裂缝。这些polyfill有助于消除裂缝，并为我们提供一道光滑的浏览器墙。

我在六月的[HTML5 talk](https://remysharp.com/talks/#2010_html5conf)中暂时使用了新术语，即[ThinkVitamin]（http://thinkvitamin.com/online-conferences/html5/），但是我不想这样做，因为担心尝试太难而不推出新术语。但是，我确实将其介绍给HTML5简介，我只能假定它近期已经发生了。

最近在[JS Conf]（http://jsconf.us/2010/），[Paul Irish]（http://paulirish.com/）发布了[polyfills和shims列表]（http://github.com / Modernizr / Modernizr / wiki / HTML5-Cross-browser-Polyfills）- 很棒的资源列表，可为开发人员减轻使用旧版浏览器的痛苦。

看起来polyfilling有一些优势，所以让我们开始使用它们，并将旧的（甚至是更新的）浏览器提高到我们期望的水平。