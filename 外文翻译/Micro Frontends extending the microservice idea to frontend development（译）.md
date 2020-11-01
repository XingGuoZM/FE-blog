原文地址：[Micro Frontends extending the microservice idea to frontend development](https://micro-frontends.org/)

由多个拥有独立发布能力的团队构建现代Web应用程序的技术，策略和方法。

## 什么是微前端？
"微前端"一词最早于2016年底出现在[ThoughtWorks Technology Radar](https://www.thoughtworks.com/radar/techniques/micro-frontends)上。它将微服务的概念扩展到了前端世界。当前的趋势是构建一个特性丰富且功能强大的浏览器应用程序（又名单页应用程序），该应用程序未应用微服务架构。随着时间的流逝，通常由独立团队开发的前端层会不断增长，并且变得越来越难以维护。这就是我们所谓的[巨石应用](https://www.youtube.com/watch?v=pU1gXA0rfwc)。

微前端背后的想法是将网站或Web应用程序视为由每个独立团队拥有功能的合集。每个团队都有自己关心和专长的不同业务或任务领域。一个团队是跨职能的，从数据库到用户界面，端到端地开发其功能。

但是，这个想法并不新奇。它与[自包含系统](http://scs-architecture.org/)概念有很多共同点。过去，类似的方法被称为[垂直系统的前端集成](https://dev.otto.de/2014/07/29/scaling-with-microservices-and-vertical-decomposition/)。但是微前端显然是一个更友好，更小巧的术语。

### 巨石应用
![Monolithic Frontends](https://micro-frontends.org/ressources/diagrams/organisational/monolith-frontback-microservices.png)

### 垂直组织
![End-To-End Teams with Micro Frontends](https://micro-frontends.org/ressources/diagrams/organisational/verticals-headline.png)

## 什么是现代web应用？
在介绍中，我使用了"构建现代web应用程序"一词。让我们定义与此术语相关的假设。

将这个东西放到更宽阔的视野中，[Aral Balkan](https://ar.al/)写过一篇博客文章，介绍了他的[Documents-to-Applications Continuum](https://ar.al/notes/the-documents-to-applications-continuum/)。他提出了滑动比例尺的概念，其中在左侧是一个由静态文档构建且通过链接连接的站点，而在右侧是一个纯行为驱动的，无内容的应用程序，例如在线照片编辑器。

如果您将项目放置在此范围的左侧，则非常适合在Web服务器级别进行集成。使用此模型，服务器从构成用户请求的页面的所有组件中收集并连接HTML字符串。通过从服务器重新加载页面或通过ajax替换页面的一部分来完成更新。[Gustaf Nilsson Kotte](https://twitter.com/gustaf_nk/)撰写了有关此主题的[综合文章](https://gustafnk.github.io/microservice-websites/)。

当您的用户界面必须提供实时反馈（即使是在不可靠的连接上）时，仅由服务器渲染的网站已不再满足要求。要实现[Optimistic UI](https://www.smashingmagazine.com/2016/11/true-lies-of-optimistic-user-interfaces/)或[Skeleton Screens](http://www.lukew.com/ff/entry.asp1797)，您还需要能够在设备本身上更新用户界面。Google的术语[Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)恰如其分地描述了成为网络良好公民（渐进式增强功能）的平衡行为，同时还提供了类似App的功能表现。这种应用程序位于site-app-continuum中间的某个位置。在这里，仅基于服务器的解决方案已经不能满足要求。我们必须将集成转移到浏览器中，这是本文的重点。

## 微型前端背后的核心思想
- 技术不可知
每个团队都应该能够选择和升级其堆栈，而不必与其他团队进行协调。自定义元素是一种隐藏实现细节，同时为其他人提供中立接口的好方法。

- 隔离团队代码
即使所有团队都使用相同的框架，也不要共享运行时间。构建独立的独立应用程序。不要依赖共享状态或全局变量。

- 建立团队前缀
同意尚无法隔离的命名约定。命名空间CSS，事件，本地存储和Cookies，以避免冲突并阐明所有权。

- 通过自定义API支持本机浏览器功能
使用[浏览器事件进行通信](https://micro-frontends.org/#parent-child-communication--dom-modification)而不是构建全局的PubSub系统。如果确实需要构建跨团队API，请尝试使其尽可能简单。

- 建立弹性站点
即使JavaScript失败或尚未执行，您的功能也应该很有用。使用[通用渲染](https://micro-frontends.org/#serverside-rendering--通用渲染)和渐进增强功能可改善感知性能。

## DOM是API
[自定义元素](https://developers.google.com/web/fundamentals/getting-started/primers/customelements)，是Web组件规范中的互操作性，是集成到浏览器中的一个很好的原始方法。每个团队都使用自己选择的网络技术来构建其组件，并将其包装在一个自定义元素中（例如\<order-minicart\> \</ order-minicart\>）。该特定元素（标记名，属性和事件）的DOM规范充当其他团队的合同或公共API。优点是他们可以使用组件及其功能，而无需了解实现。他们只需要能够与DOM交互即可。

但是，仅自定义元素并不能满足我们所有需求。为了解决渐进增强，通用渲染或路由问题，我们需要其他软件。

该页面分为两个主要区域。首先，我们将讨论[页面组成](https://micro-frontends.org/#page-composition)-如何根据不同团队拥有的组件来组装页面。之后，我们将展示实现客户端[页面转换](https://micro-frontends.org/#page-transition)的示例。

## 页面组成
除了使用不同框架本身编写的客户端和服务器端代码集成之外，还应该讨论很多附带主题：隔离js的机制，避免css冲突，按需加载资源，在团队之间共享公共资源，处理数据获取 并考虑为用户提供良好的加载状态。 我们将一步一步地涉及这些主题。

## 基本原型
该型号拖拉机商店的产品页面将作为以下示例的基础。

它具有一个变体选择器，可以在三种不同的拖拉机型号之间切换。 更改产品图片时，名称，价格和建议会更新。 还有一个购买按钮，将选择的变体添加到购物篮，并在顶部增加一个迷你购物篮，并相应地进行更新。

![Example 0 - Product Page - Plain JS](https://micro-frontends.org/ressources/video/model-store-0.gif)

[try in browser](https://micro-frontends.org/0-model-store/) & [inspect the code](https://github.com/neuland/micro-frontends/tree/master/0-model-store)

所有HTML都是使用纯JavaScript和没有依赖性的ES6模板字符串在客户端生成的。 该代码使用简单的状态/标记分离，并在每次更改时重新呈现整个HTML客户端-无需花哨的DOM区别，也没有通用渲染。也没有团队分离-[代码](https://github.com/neuland/micro-frontends/tree/master/0-model-store)写在一个js/css文件中。

## 客户端集成
在此示例中，页面分为三个团队拥有的单独的组件/片段。Team Checkout（蓝色）现在负责与购买过程有关的所有事情，即“购买”按钮和迷你购物篮。Team Inspire（绿色）在此页面上管理产品推荐。该页面本身归团队产品（红色）所有。

![Example 1 - Product Page - Composition](https://micro-frontends.org/ressources/screen/three-teams.png)

[try in browser](https://micro-frontends.org/1-composition-client-only/) & [inspect the code](https://github.com/neuland/micro-frontends/tree/master/1-composition-client-only)

团队产品决定要包括的功能以及在布局中的位置。该页面包含Team Product本身可以提供的信息，例如产品名称，图像和可用的变体。但是它也包括其他团队的片段（自定义元素）。

## 如何创建自定义元素？
让我们以“购买”按钮为例。Team Product包含按钮，只需将<blue-buy sku =“ t_porsche”> </ blue-buy>添加到标记中的所需位置即可。为此，Team Checkout必须在页面上注册蓝色购买元素。
```js
class BlueBuy extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button type="button">buy for 66,00 €</button>`;
  }

  disconnectedCallback() { ... }
}

window.customElements.define（'blue-buy'，BlueBuy）;
```
现在，每次浏览器遇到一个新的blue-buy标签时，都会调用connectedCallback。 这是对自定义元素的根DOM节点的引用。可以使用标准DOM元素（例如innerHTML或getAttribute（））的所有属性和方法。

![Custom Element in Action](https://micro-frontends.org/ressources/video/custom-element.gif)

命名元素时，规范定义的唯一要求是名称必须包含短划线（-），以保持与即将到来的新HTML标记的兼容性。在接下来的示例中，使用了命名约定[team_color]-[feature]。团队名称空间可防止冲突，因此只需查看DOM，就可以清楚地了解功能的所有权。

## 父子通信 / DOM修改
当用户在变量选择器中选择另一台拖拉机时，必须相应地更新购买按钮。要实现此团队产品，只需从DOM中删除现有元素，然后插入一个新元素即可。
```js
container.innerHTML;
// => <blue-buy sku="t_porsche">...</blue-buy>
container.innerHTML = '<blue-buy sku="t_fendt"></blue-buy>';
```
同步调用旧元素的connectedCallback，以使该元素有机会清理诸如事件侦听器之类的东西。之后，将调用新创建的t_fendt元素的connectedCallback。

另一个性能更高的选项是仅更新现有元素上的sku属性。
```js
document.querySelector('blue-buy').setAttribute('sku', 't_fendt');
```

如果Team Product使用具有DOM差异功能的模板引擎（如React），则将由算法自动完成。

![Custom Element Attribute Change](https://micro-frontends.org/ressources/video/custom-element-attribute.gif)

为了支持这一点，Custom元素可以实现attributeChangedCallback并指定观察到的属性列表，应为其触发此回调

```js
const prices = {
  t_porsche: '66,00 €',
  t_fendt: '54,00 €',
  t_eicher: '58,00 €',
};

class BlueBuy extends HTMLElement {
  static get observedAttributes() {
    return ['sku'];
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const sku = this.getAttribute('sku');
    const price = prices[sku];
    this.innerHTML = `<button type="button">buy for ${price}</button>`;
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    this.render();
  }
  disconnectedCallback() {...}
}

window.customElements.define('blue-buy', BlueBuy);
```

为了避免重复，引入了render()方法，该方法从connectedCallback和attributeChangedCallback调用。这种方法收集所需的数据，而innerHTML就是新的标记。当决定在Custom Element中使用更复杂的模板引擎或框架时，这里就是初始化代码的地方。

## 浏览器支持

上面的示例使用了[当前受Chrome，Safari和Opera支持的自定义元素V1规范](http://caniuse.com/#feat=custom-elementsv1)。 但是，使用[document-register-element](https://github.com/WebReflection/document-register-element)可以使用轻量级且经过战斗测试的polyfill来使其在所有浏览器中都能正常工作。在幕后，它使用[广泛支持的](http://caniuse.com/#feat=mutationobserver)突变观察者API，因此在后台不会出现骇人的DOM树。

##  框架兼容性
由于自定义元素是一种网络标准，因此所有主要的JavaScript框架（如Angular，React，Preact，Vue或Hyperapp）都支持它们。 但是当您进入细节时，某些框架中仍然存在一些实现问题。 在[无处不在的自定义元素](https://custom-elements-everywhere.com/)[Rob Dodson](https://twitter.com/rob_dodson)汇集了一个兼容性测试套件，着重强调了尚未解决的问题。

## 父子或兄弟组件通信/ DOM事件
但是，传递属性不足以进行所有交互。在我们的示例中，当用户单击“购买”按钮时，迷你购物篮应刷新。

这两个片段均由Team Checkout拥有（蓝色），因此它们可以构建某种内部JavaScript API，该API可使迷你购物篮知道何时按下按钮。但这将要求组件实例相互了解，并且也将成为隔离冲突。

较干净的方法是使用PubSub机制，在该机制中，一个组件可以发布消息，而其他组件可以订阅特定主题。幸运的是，浏览器内置了此功能。这正是单击，选择或鼠标悬停之类的浏览器事件的工作方式。除了本机事件，还可以使用新的CustomEvent（...）创建更高级别的事件。事件始终与创建/调度事件的DOM节点相关。大多数本机事件还具有起泡功能。这样就可以侦听DOM特定子树上的所有事件。如果要侦听页面上的所有事件，请将事件侦听器附加到window元素。在示例中，blue：basket：changed-event的创建如下所示：
```js
class BlueBuy extends HTMLElement {
  [...]
  connectedCallback() {
    [...]
    this.render();
    this.firstChild.addEventListener('click', this.addToCart);
  }
  addToCart() {
    // maybe talk to an api
    this.dispatchEvent(new CustomEvent('blue:basket:changed', {
      bubbles: true,
    }));
  }
  render() {
    this.innerHTML = `<button type="button">buy</button>`;
  }
  disconnectedCallback() {
    this.firstChild.removeEventListener('click', this.addToCart);
  }
}
```

现在，迷你购物篮可以在窗口上订阅此事件，并在刷新数据时得到通知。

```js
class BlueBasket extends HTMLElement {
  connectedCallback() {
    [...]
    window.addEventListener('blue:basket:changed', this.refresh);
  }
  refresh() {
    // fetch new data and render it
  }
  disconnectedCallback() {
    window.removeEventListener('blue:basket:changed', this.refresh);
  }
}
```
通过这种方法，迷你篮片段向其范围（窗口）之外的DOM元素添加了一个侦听器。 对于许多应用程序这应该可以，但是如果您对此不满意，则还可以实现一种方法，其中页面本身（团队产品）侦听事件并通过在DOM元素上调用refresh（）通知迷你购物篮。

```js
// page.js
const $ = document.getElementsByTagName;

$('blue-buy')[0].addEventListener('blue:basket:changed', function() {
  $('blue-basket')[0].refresh();
});
```

强制性地调用DOM方法并不常见，但是可以在[video element api](https://developer.mozilla.org/de/docs/Web/HTML/Using_HTML5_audio_and_video#Controlling_media_playback)中找到。 如果可能，应首选使用声明式方法（属性更改）。

## 服务器端渲染/通用渲染
自定义元素非常适合在浏览器内部集成组件。但是，当构建一个可在Web上访问的站点时，初始负载性能很可能会变得很重要，并且在下载并执行所有js框架之前，用户将看到白屏。另外，最好考虑一下如果JavaScript失败或被阻止，网站会发生什么情况。[Jeremy Keith](https://adactio.com/)在其电子书/播客[Resilient Web Design](https://resilientwebdesign.com/)中解释了其重要性。因此，在服务器上呈现核心内容的能力是关键。可悲的是，Web组件规范根本没有涉及服务器渲染。没有JavaScript，没有自定义元素:(

## 自定义元素+服务器端包含=❤️
为了使服务器渲染正常工作，重构了前面的示例。每个团队都有自己的快递服务器，还可以通过url访问Custom Element的render（）方法。

```js
$ curl http://127.0.0.1:3000/blue-buy?sku=t_porsche
<button type="button">buy for 66,00 €</button>
```
“自定义元素”标记名称用作路径名-属性成为查询参数。现在，有一种方法可以通过服务器呈现每个组件的内容。结合\<blue-buy \>-Custom Elements，可以实现与通用Web组件非常接近的功能：
```js
<blue-buy sku="t_porsche">
  <!--#include virtual="/blue-buy?sku=t_porsche" -->
</blue-buy>
```

#include注释是[服务器端包含](https://en.wikipedia.org/wiki/Server_Side_Includes)的一部分，该功能在大多数Web服务器中都可用。 是的，这是过去使用的将当前日期嵌入到我们网站上的技术。还有一些替代技术，例如[ESI](https://en.wikipedia.org/wiki/Edge_Side_Includes)，[nodesi](https://github.com/Schibsted-Tech-Polska/nodesi)，[compoxure](https://github.com/tes/compoxure)和[tailor](https://github.com/zalando/tailor)，但是对于我们的项目，SSI已证明自己是一种简单且难以置信的稳定解决方案。

在Web服务器将完整页面发送到浏览器之前，#include注释将替换为/ blue-buy？sku = t_porsche的响应。 nginx中的配置如下所示：
```js
upstream team_blue {
  server team_blue:3001;
}
upstream team_green {
  server team_green:3002;
}
upstream team_red {
  server team_red:3003;
}

server {
  listen 3000;
  ssi on;

  location /blue {
    proxy_pass  http://team_blue;
  }
  location /green {
    proxy_pass  http://team_green;
  }
  location /red {
    proxy_pass  http://team_red;
  }
  location / {
    proxy_pass  http://team_red;
  }
}
```
指令ssi：on; 启用SSI功能，并为每个团队添加上游和位置块，以确保将所有以/ blue开头的url路由到正确的应用程序（team_blue：3001）。另外，/路由映射到红色队，该红色队控制着主页/产品页面。

此动画在禁用了JavaScript的浏览器中显示了拖拉机商店。

![Serverside Rendering - Disabled JavaScript](https://micro-frontends.org/ressources/video/server-render.gif)

[inspect the code](https://github.com/neuland/micro-frontends/tree/master/2-composition-universal)

现在，变体选择按钮是实际的链接，每次单击都会导致页面重新加载。右侧的终端说明了如何将页面请求路由到红色团队，该团队控制产品页面，然后用蓝色和绿色团队的片段补充标记。

重新打开JavaScript时，仅第一个请求的服务器日志消息将可见。像第一个示例一样，所有后续的拖拉机更改都由客户端处理。在后面的示例中，产品数据将从JavaScript中提取，并根据需要通过REST API加载。

您可以在本地计算机上使用此示例代码。 仅需要安装[Docker Compose](https://docs.docker.com/compose/install/)。

```js
git clone https://github.com/neuland/micro-frontends.git
cd micro-frontends/2-composition-universal
docker-compose up --build
```

然后，Docker在端口3000上启动Nginx，并为每个团队构建node.js映像。 在浏览器中打开[http://127.0.0.1:3000/](http://127.0.0.1:3000/)时，应该会看到一个红色的拖拉机。docker-compose的组合日志可轻松查看网络中正在发生的事情。遗憾的是，无法控制输出颜色，因此您必须忍受以下事实：团队蓝色可能会以绿色突出显示：)

src文件映射到各个容器中，并且在更改代码后，节点应用程序将重新启动。更改nginx.conf要求重新启动docker-compose才能生效。因此，随时随意摆弄并提供反馈。

## 数据获取和加载状态
SSI/ESI方法的缺点是，最慢的片段确定整个页面的响应时间。因此，最好是可以缓存片段的响应。对于制作成本高且难以缓存的片段，通常最好将其从初始渲染中排除。 可以将它们异步加载到浏览器中。在我们的示例中，绿色个性化片段显示了个性化推荐，这是一个备选方案。

一种可能的解决方案是，红色团队仅跳过SSI Include。

### 之前
```
<green-recos sku="t_porsche">
  <!--#include virtual="/green-recos?sku=t_porsche" -->
</green-recos>
```
### 之后
```js
<green-recos sku="t_porsche"></green-recos>
```

重要说明：自定义元素[无法自动关闭](https://developers.google.com/web/fundamentals/architecture/building-components/customelements#jsapi)，因此编写<green-recos sku =“ t_porsche “ />无法正常工作。

[Reflow](https://micro-frontends.org/ressources/video/data-fetching-reflow.gif)

渲染仅在浏览器中进行。但是，从动画中可以看出，此更改现在导致页面的大量重排。推荐区域最初是空白的。团队果岭JavaScript已加载并执行。进行了用于获取个性化推荐的API调用。呈现推荐标记，并请求关联的图像。现在，该片段需要更多空间并推动页面布局。

有不同的选择来避免像这样令人讨厌的重排。控制页面的红色小组可以固定建议容器的高度。在响应式网站上，确定高度通常很棘手，因为不同的屏幕尺寸可能会有所不同。但是更重要的问题是，这种团队间协议在红色和绿色团队之间建立了紧密的联系。如果绿色团队希望在reco元素中添加其他子标题，则必须与红色团队在新高度上进行协调。两个团队都必须同时推出他们的更改，以避免布局混乱。

更好的方法是使用一种称为[骨架屏](https://blog.prototypr.io/luke-wroblewski-introduced-skeleton-screens-in-2013-through-his-work-on-the-polar-app-later-fd1d32a6a8e7)。红色小组将绿色recos SSI包括在标记中。此外，团队绿色更改了其片段的服务器端渲染方法，以便生成内容的示意图。骨架标记可以重用实际内容的部分布局样式。这样，它可以保留所需的空间，并且实际内容的填充不会导致跳转。

![Skeleton Screen](https://micro-frontends.org/ressources/video/data-fetching-skeleton.gif)

骨架屏幕对于客户端渲染也非常有用。当您的自定义元素由于用户操作而插入DOM时，它可以立即渲染框架，直到从服务器需要的数据到达为止。

即使在诸如变量选择之类的属性更改上，您也可以决定切换到框架视图，直到新数据到达。这样，用户可以得到片段中正在发生某些事情的指示。但是，当端点快速响应时，新旧数据之间的短暂骨架闪烁也可能很烦人。保留旧数据或使用智能超时可以有所帮助。因此，请明智地使用此技术，并尝试获取用户反馈。

## 在页面之间导航
即将继续……（我保证）

观看[Github Repo](https://github.com/neuland/micro-frontends)以获得通知

## 其他资源
- [书籍：行动中的微型前端](https://www.manning.com/books/micro-frontends-in-action?a_aid=mfia&a_bid=5f09fdeb)由我编写。
- [Talk：Micro Frontends-MicroCPH，哥本哈根2019]（https://www.youtube.com/watch?v=wCHYILvM7kU）（[幻灯片](https://noti.st/naltatis/zQb2m5/micro-frontends- -nitty-gritty-details-of-frontend-backend-happyend)）Nitty Gritty Details或Frontend，Backend，🌈Happyend
- [Talk：Micro Frontends-Web Rebels，奥斯陆，2018年](https://www.youtube.com/watch?v=dTW7eJsIHDg)（[幻灯片](https://noti.st/naltatis/HxcUfZ/micro-frontends -认为更小，避免整体式的爱后端)）更小的思考，避免整体式的，❤️后端
- [幻灯片：微型前端-JSUnconf.eu 2017](https://speakerdeck.com/naltatis/micro-frontends-building-a-modern-webapp-with-multiple-teams)
- [Talk：与您的前端Monolith分手-JS Kongress 2017](https://www.youtube.com/watch?v=W3_8sxUurzA)Elisabeth Engel在gutefrage.net上讨论了实现Micro Frontends的问题。
- [Article：Micro Frontends](https://martinfowler.com/articles/micro-frontends.html)Cam Jackson在Martin Fowlers博客上的文章
- [发布：微前端-前端Web开发的微服务方法](https://medium.com/@tomsoderlund/micro-frontends-a-microservice-approach-to-front-end-web-development-f325ebdadc16)TomSöderlund解释了核心概念并提供了与此主题相关的链接
- [发布：微服务到微前端](http://www.agilechamps.com/microservices-to-micro-frontends/)Sandeep Jain总结了微服务和微前端背后的主要原理
- [链接集：Elisabeth Engel撰写的Micro Frontends](https://micro-frontends.zeef.com/elisabeth.engel?ref=elisabeth.engel&share=ee53d51a914b4951ae5c94ece97642fc)大量有关此主题的帖子，讲座，工具和其他资源
- [Awesome Micro Frontends](https://github.com/ChristianUlbrich/awesome-microfrontends)Christian Ulbrich精心策划的链接列表cur
- [无处不在的自定义元素](https://custom-elements-everywhere.com/)确保框架和自定义元素可以是BFF
- 可在[manufactum.com](https://www.manufactum.com/)上购买拖拉机：)
这家商店是由两个团队使用此处介绍的技术开发的。

## 即将发生的事情……（很快）
- 用例
   - 在页面之间导航
     - 软导航与硬导航
     - 通用路由器
   - …
- 主题
   - 隔离的CSS /一致的用户界面/样式指南和样式库
   - 初始负载下的性能
   - 使用网站时的表现
   - 加载CSS
   - 加载JS
   - 集成测试
   - …

## 贡献者
- [Koike Takayuki](https://github.com/koiketakayuki)将网站翻译为[日语](https://micro-frontends-japanese.org/)。
- [JorgeBeltrán](https://github.com/scipion)，将网站翻译为[西班牙文](https://micro-frontends-es.org/)。
- [Bruno Carneiro](https://github.com/Tautorn)将网站翻译为[葡萄牙语](https://tautorn.github.io/micro-frontends/)。

该站点由Github Pages生成。 它的来源可以在[neuland/micro-frontends](https://github.com/neuland/micro-frontends/)上找到。