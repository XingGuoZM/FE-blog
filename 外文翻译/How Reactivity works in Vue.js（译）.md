原文地址：[How Reactivity works in Vue.js](https://deepsource.io/blog/reactivity-in-vue/)
 

在前端开发人员的世界中，“响应式”是每个人都使用的东西，但很少有人能理解。 确实，这不是谁的错，因为每个人在编程中对响应式的定义不同。 因此，在开始之前，我只给您一个有关前端框架的定义。

“ JavaScript框架之间的响应式是一种应用程序状态的更改自动反映在DOM中的现象。”

![Reactivity](https://assets.deepsource.io/7effb93/images/blog/reactivity-in-vue/reactivity.png)

## Vue.js中的响应式
Vue.js中的响应式是附带了包里的一些东西。

这是Vue.js中具有双向绑定（使用v-model）的示例，

在上面的示例中，您可以清楚地看到数据模型层中的更改，
```
    new Vue({
      el: "#app",
      data: {
        message: ""
      },
    })
```
自动反映在视图层中
```
    <div id="app">
      <h1>Enter your message in the box</h1>
      <p>{{ message }}</p><br>
      <input placeholder="Enter message" v-model="message" />
    </div>
```

如果您熟悉Vue.js，那么您可能已经习惯了。 但是，您必须记住，香草JS中的工作方式不同。 让我用一个例子来解释它。 在这里，我在vanilla JS中重新创建了上面的Vue.js响应式示例。


您可以在此处看到JavaScript不是自然反应的，因为当您输入消息时，您不会在HTML视图中看到该消息自动重新渲染。 为什么会这样呢？ Vue.js是做什么的？

好吧，要得到答案，我们必须了解其潜在的反应系统。 一旦我们有了一个清晰的了解，我们将尝试使用vanilla JavaScript重新创建我们自己的反应系统，该系统类似于Vue.js响应式系统。

## Vue.js响应式系统
![Reactivity System](https://assets.deepsource.io/7effb93/images/blog/reactivity-in-vue/reactivity-system.png)

让我从头为您分解一下

### 第一次渲染
在第一次渲染上，如果“触达”了数据属性（将访问数据属性称为“触达”该属性），则会调用其getter函数。

Getter：getter函数调用监视程序的目的是为了收集此数据属性作为依赖项。

（如果data属性是一个依赖项，则意味着每次此属性的值更改时，某些目标代码/函数都将运行。）

### 观察者
每当调用观察程序时，它都会将该数据属性添加为从调用它的getter的依赖项。 观察者还负责调用组件渲染函数。

### 组件渲染函数

实际上，Vue的组件渲染功能并不是那么简单，但是为了理解起见，我们只需要知道它会返回具有更新数据属性的Virtual DOM Tree，该虚拟DOM树就会显示在视图中。

数据变化！
这部分，基本上是Vue.js中反应性的核心。 因此，当我们对数据属性（作为依赖项收集）进行更改时，将调用其setter函数。

Setter：setter函数在数据属性的每次更改时通知观察者。 我们已经知道，观察者运行组件渲染功能。 因此，在data属性中所做的更改将显示在视图中。

我希望您现在可以清楚该工作流程，因为我们将在原始JavaScript中重新创建此响应式系统。

## 在vanilla JavaScript中重新创建Vue.js反应系统
现在，我们正在重新创建响应式系统，最好的方法是一对一地理解其构建块（以代码形式），最后我们可以组装所有的系统，

### 数据模型
任务：首先，我们需要一个数据模型

解决方案：
我们需要什么样的数据？ 由于我们正在重新创建我们先前看到的Vue示例，因此我们将需要一个完全像它的数据模型。
```
    let data = {
    	message: ""
    }
```
### 一个目标函数
任务：我们需要有一个目标函数，一旦数据模型发生更改，将运行该函数。

解决方案：
解释目标函数是什么的最简单方法，

“嗨，我是一条数据属性消息，我有一个目标函数renderFunction（）。 每当我的值改变时，我的目标函数就会运行。

PS：我可以有多个目标函数，而不仅仅是renderFunction（）”

因此，我们声明一个名为target的全局变量，该变量将帮助我们为所有数据属性记录一个目标函数。
```
    let target = null
```

### 依赖类
任务：我们需要一种收集数据属性作为依赖的方法

到目前为止，我们只有数据和目标函数的概念，它们在数据值更改时运行。 但是，我们需要一种方法来分别记录每个数据属性的目标函数，以便当数据属性发生更改时，只有那些针对该数据属性分别存储的目标函数才会运行。

解决方案：
我们需要为每个数据属性的目标函数提供一个单独的存储空间。

假设我们有以下数据，

```
    let data = {
    	x: '',
    	y: ''
    }
```

然后，我们要为x和y提供两个单独的存储。 那么，为什么不只定义一个Dependency类，每个数据属性也可以有其唯一的实例呢？

这可以通过定义一个Dependency类来完成，以便每个数据属性都可以拥有自己的Dependency类实例。 因此，可以为目标功能分配每个数据属性自己的存储空间。
```
    class Dep {
    	constructor() {
      	this.subscribers = []
      }
    }
```

依赖类具有订户数组，该数组将用作目标函数的存储。

![Dependency Class](https://assets.deepsource.io/7effb93/images/blog/reactivity-in-vue/dependency-class.png)

现在，我们还需要做两件事来使Dependency类完全完成，
- depend（）：该函数将目标函数推入订阅者数组。
- notify（）：此函数运行存储在订阅服务器数组中的所有目标函数。

```
    class Dep {
    	constructor() {
      	this.subscribers = []
      }
      depend() {
      	// Saves target function into subscribers array
      	if (target && !this.subscribers.includes(target)) {
        	this.subscribers.push(target);
        }
      }
      notify() {
      	// Replays target functions saved in the subscribers array
        this.subscribers.forEach(sub => sub());
      }
    }
```

### 追踪变化
任务：我们需要找到一种方法，只要该属性发生更改，就可以自动运行该属性的目标函数。

解决方案：

到现在为止，我们已有，
- 数据
- 数据更改时会发生什么
- 依赖收集机制

下一步我们需要的是，
- 一种在“触达”数据属性时触发depend()的方法。
- 一种跟踪数据属性中的任何更改然后触发notify()的方法。
为了实现这一点，我们将使用getter和setter。 Object.defineProperty（）允许我们为此类任何数据属性添加getter和setter，

```
    Object.defineProperty(data, "message", {
    	get() {
      	console.log("This is getter of data.message")
      },
      set(newVal) {
      	console.log("This is setter of data.message")
      }
    })
```
因此，我们将为所有可用的数据属性定义getter和setter，
```
    Object.keys(data).forEach(key => {
    	let internalValue = data[key]

      // Each property gets a dependency instance
      const dep = new Dep()

      Object.defineProperty(data, key, {
      	get() {
        	console.log(`Getting value, ${internalValue}`)
        	dep.depend() // Saves the target function into the subscribers array
          return internalValue
        },
        set(newVal) {
        	console.log(`Setting the internalValue to ${newVal}`)
        	internalValue = newVal
          dep.notify() // Reruns saved target functions in the subscribers array
        }
      })
    })
```

另外，您可以在上方看到在getter中正在调用dep.depend（），因为当“触达”数据属性时，将调用其getter函数。

我们在setter内部具有dep.notify（），因为当该数据属性的值发生更改时，将调用setter函数。

### 观察者
任务：我们需要一种方法来封装当数据属性的值更改时必须运行的代码（目标函数）。

解决方案：

到目前为止，我们已经创建了一个系统，在该系统中，数据属性在被“触达”时立即作为依赖项添加，并且如果该数据属性有任何更改，则将执行其所有目标函数。

但是，仍然缺少一些东西，我们还没有使用目标函数的任何代码来初始化该过程。 因此，为了封装目标函数的代码然后初始化该过程，我们将使用观察者。

观察者是一个函数，它将另一个函数作为参数，然后执行以下三个操作：
- 将匿名函数的参数赋值给全局目标变量。
- 运行target（）。 （这样做会初始化过程。）
- 重新分配 target = null
```
    let watcher = function(func){
      // Here, a watcher is a function that encapsulates the code
      // that needs to recorded/watched.
      target = func // Then it assigns the function to target
      target() // Run the target function
      target = null // Reset target to null
    }
```

现在，如果我们将一个函数传递给观察者，然后运行它，那么自适应系统将完成初始化的过程。
```
    let renderFunction = () => {
    	// Function that renders HTML code.
    	document.getElementById("message").innerHTML = data.message;
    }

    watcher(renderFunction);
```
### 然后，我们完成了！

现在，组装以上所有代码，我们已经成功地使用原始JavaScript重新创建了Vue.js响应式系统。 这是我使用此响应式系统向您展示的第一个示例的实现，