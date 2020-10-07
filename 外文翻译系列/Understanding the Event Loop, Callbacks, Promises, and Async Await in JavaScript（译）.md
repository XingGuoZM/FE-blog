原文地址：[Understanding the Event Loop, Callbacks, Promises, and Async Await in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-the-event-loop-callbacks-promises-and-async-await-in-javascript)
作者选择了[COVID-19救济基金](https://www.brightfunds.org/funds/write-for-donations-covid-19-relief-fund)来接受捐赠，这是[Write for DOnations](https://do.co/w4do-cta)计划的一部分。

## 介绍
在互联网的早期，网站通常由[HTML页面](https://www.digitalocean.com/community/tutorial_series/how-to-build-a-website-with-html)中的静态数据组成。 但是，由于Web应用程序已变得更具交互性和动态性，因此越来越需要执行大量操作，例如发出外部网络请求以检索[API](https://developer.mozilla.org/en-US/docs/Glossary/API)数据。 要使用JavaScript处理这些操作，开发人员必须使用异步编程技术。

由于JavaScript是同步执行的单线程编程语言，该模型执行一个处理另一个操作，因此它一次只能处理一个语句。 但是，根据请求的数据大小，网络连接速度和其他因素，类似从API请求数据之类的操作可能会花费不确定的时间。 如果以同步方式执行API调用，则浏览器将无法处理任何用户输入，例如滚动或单击按钮，直到该操作完成。 这称为阻塞。

为了防止阻塞行为，浏览器环境具有JavaScript可以访问的许多Web API，这些Web API是异步的，这意味着它们可以与其他操作并行运行，而不是顺序运行。这很有用，因为它允许用户在处理异步操作时继续正常使用浏览器。

作为JavaScript开发人员，您需要知道如何使用异步Web API并处理这些操作的响应或错误。在本文中，您将了解事件循环，通过回调处理异步行为的原始方法，更新的[ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/) Promise添加以及使用async / await的现代实践。

注意：本文重点介绍浏览器环境中的客户端侧的JavaScript。在[Node.js](https://nodejs.org/)环境中，通常都适用相同的概念，但是Node.js使用自己的[C ++ API](https://nodejs.org/api/)，而不是浏览器的[Web API](https://developer.mozilla.org/en-US/docs/Web/API)。有关Node.js中异步编程的更多信息，请查看[如何在Node.js中编写异步代码](https://www.digitalocean.com/community/tutorials/how-to-write-asynchronous-code-in-node-js)。

## 事件循环
本节将说明JavaScript如何通过事件循环处理异步代码。 首先将通过事件循环的工作原理演示，然后解释事件循环的两个元素：堆栈和队列。

不使用任何异步Web API的JavaScript代码将以同步方式执行（一次一次，依次执行）。 此示例代码演示了这一点，该示例代码调用了三个函数，每个函数都在控制台上打印一个数字：
```
// Define three example functions
function first() {
  console.log(1)
}

function second() {
  console.log(2)
}

function third() {
  console.log(3)
}
```
在此代码中，您定义了三个使用console.log（）打印数字的函数。

接下来，编写对函数的调用：
```
// Execute the functions
first()
second()
third()
```
输出将基于函数被调用的顺序-first（），second（），然后third（）：
```
Output
1
2
3
```
使用异步Web API时，规则变得更加复杂。 可以用来测试此功能的内置API是setTimeout，它可以设置计时器并在指定的时间后执行操作。 setTimeout必须是异步的，否则整个浏览器将在等待期间保持冻结状态，这将导致不良的用户体验。

将setTimeout添加到第二个函数中以模拟异步请求：

```
// Define three example functions, but one of them contains asynchronous code
function first() {
  console.log(1)
}

function second() {
  setTimeout(() => {
    console.log(2)
  }, 0)
}

function third() {
  console.log(3)
}
```
setTimeout有两个参数：函数将异步运行，以及在调用该函数之前将等待的时间。 在此代码中，您将console.log包裹在一个匿名函数中，并将其传递给setTimeout，然后将该函数设置为在0毫秒后运行。

现在像以前一样调用函数：
```
// Execute the functions
first()
second()
third()
```
您可能希望将setTimeout设置为0，运行这三个函数仍然会导致数字按顺序打印。 但是因为它是异步的，所以带有超时的函数将最后打印：
```
Output
1
3
2
```

将超时设置为零秒还是五分钟都没有关系-异步代码调用的console.log将在同步顶级功能之后执行。 发生这种情况是因为JavaScript宿主环境（在本例中为浏览器）使用了称为事件循环的概念来处理并发或并行事件。 由于JavaScript一次只能执行一个语句，因此需要通知事件循环何时执行哪个特定语句。 事件循环使用堆栈和队列的概念来处理。

### 堆栈
堆栈或调用堆栈保存当前正在运行的功能的状态。 如果您不熟悉堆栈的概念，可以将其想象为具有“后进先出”（LIFO）属性的数组，这意味着您只能从堆栈末尾添加或删除项目。 JavaScript将在堆栈中运行当前框架（或在特定环境中的函数调用），然后将其删除并移至下一个框架。

对于仅包含同步代码的示例，浏览器按以下顺序处理执行：
- 将first（）添加到堆栈，运行first（），将1记录到控制台，从堆栈中删除first（）。
- 将second（）添加到堆栈中，运行second（），将2记录到控制台，从堆栈中删除second（）。
- 将third（）添加到堆栈中，运行third（），将3记录到控制台，从堆栈中删除third（）。
setTimout的第二个示例如下所示：

- 将first（）添加到堆栈，运行first（），将1记录到控制台，从堆栈中删除first（）。
- 将second（）添加到堆栈中，运行second（）。
  - 将setTimeout（）添加到堆栈中，运行setTimeout（）Web API，该API启动计时器并将匿名函数添加到队列中，从堆栈中删除setTimeout（）。
- 从堆栈中删除second（）。
- 将third（）添加到堆栈中，运行third（），将3记录到控制台，从堆栈中删除third（）。
- 事件循环检查队列中是否有任何未决消息，并从setTimeout（）中找到匿名函数，将该函数添加到堆栈中，并在控制台中记录2，然后将其从堆栈中删除。
使用异步Web API setTimeout，介绍了队列的概念，本教程将在后面进行介绍。

### 队列
队列，也称为消息队列或任务队列，是功能的等待区域。每当调用堆栈为空时，事件循环将从最旧的消息开始检查队列中是否有任何等待的消息。一旦找到一个，它将添加到堆栈中，堆栈将执行消息中的功能。

在setTimeout示例中，由于定时器设置为0秒，因此在其余顶级执行之后，匿名函数立即运行。重要的是要记住，计时器并不意味着代码将在0秒内执行或在指定的时间执行，而是在该时间段内将匿名函数添加到队列中。之所以存在此队列系统，是因为如果计时器在计时器完成时将匿名函数直接添加到堆栈中，则会中断当前正在运行的任何函数，这可能会产生意想不到的效果。

注意：还有另一个称为承诺的队列，称为作业队列或微任务队列。像promise这样的微任务比setTimeout这样的宏任务具有更高的优先级。

现在您知道了事件循环如何使用堆栈和队列来处理代码的执行顺序。下一个任务是弄清楚如何控制代码中的执行顺序。为此，您将首先了解确保事件循环正确处理异步代码的原始方法：回调函数。

### 回调函数
在setTimeout示例中，具有超时功能的函数在主顶级执行上下文中的所有内容之后运行。但是，如果要确保其中一个功能（如第三个功能）在超时后运行，则必须使用异步编码方法。这里的超时可以表示包含数据的异步API调用。您想使用API​​调用中的数据，但是必须确保首先返回数据。

解决此问题的原始解决方案是使用回调函数。回调函数没有特殊的语法。它们只是一个作为参数传递给另一个函数的函数。将另一个函数作为参数的函数称为高阶函数。根据此定义，如果将任何函数作为参数传递，则任何函数都可以成为回调函数。回调本质上不是异步的，但可以用于异步目的。

这是一个高阶函数和回调的语法代码示例：
```
// A function
function fn() {
  console.log('Just a function')
}

// A function that takes another function as an argument
function higherOrderFunction(callback) {
  // When you call a function that is passed as an argument, it is referred to as a callback
  callback()
}

// Passing a function
higherOrderFunction(fn)
```
在此代码中，您定义了一个函数fn，定义了一个以函数回调为参数的函数higherOrderFunction，并将fn作为回调传递给了higherOrderFunction。

运行此代码将得到以下内容：
```
Output
Just a function
```
让我们使用setTimeout返回第一个，第二个和第三个函数。 到目前为止,这是所有的：
```
function first() {
  console.log(1)
}

function second() {
  setTimeout(() => {
    console.log(2)
  }, 0)
}

function third() {
  console.log(3)
}
```
任务是使第三个功能始终延迟执行，直到第二个功能中的异步操作完成为止。 这就是回调的来源。您无需在执行的顶层执行第一，第二和第三，而是将第三函数作为参数传递给second。 异步操作完成后，第二个函数将执行回调。

这是应用了回调的三个函数：
```
// Define three functions
function first() {
  console.log(1)
}

function second(callback) {
  setTimeout(() => {
    console.log(2)

    // Execute the callback function
    callback()
  }, 0)
}

function third() {
  console.log(3)
}
```
现在，执行第一和第二，然后将第三作为参数传递给第二个函数：

```
first()
second(third)
```
运行此代码块后，您将收到以下输出：
```
Output
1
2
3
```

前1将打印，计时器完成后（在这种情况下为零秒，但您可以将其更改为任意数量）将先打印2，然后再打印3。通过将函数作为回调传递，您已成功延迟了 直到异步Web API（setTimeout）完成。

这里的主要要点是回调函数不是异步的— setTimeout是负责处理异步任务的异步Web API。 回调仅允许您通知异步任务何时完成并处理任务的成功或失败。

既然您已经学习了如何使用回调来处理异步任务，那么下一节将说明嵌套过多的回调并创建“厄运金字塔”的问题。

## 嵌套的回调和厄运金字塔
回调函数是确保函数延迟执行的有效方法，直到另一个函数完成并返回数据。 但是，由于回调的嵌套性质，如果您有很多相互依赖的连续异步请求，则代码最终可能变得混乱。 早期，这对JavaScript开发人员来说是一个很大的挫败，因此包含嵌套回调的代码通常被称为“厄运金字塔”或“回调地狱”。

这是嵌套回调的演示：
```
function pyramidOfDoom() {
  setTimeout(() => {
    console.log(1)
    setTimeout(() => {
      console.log(2)
      setTimeout(() => {
        console.log(3)
      }, 500)
    }, 2000)
  }, 1000)
}
```
在此代码中，每个新的setTimeout嵌套在一个更高阶的函数中，从而创建了越来越深的回调的金字塔形状。 运行此代码将得到以下内容：
```
Output
1
2
3
```
实际上，使用现实世界中的异步代码，这可能变得更加复杂。 您很可能需要使用异步代码进行错误处理，然后将每个响应中的一些数据传递到下一个请求。 通过回调执行此操作将使您的代码难以阅读和维护。

这是一个更现实的“厄运金字塔”的可运行示例，您可以使用它：
```
// Example asynchronous function
function asynchronousRequest(args, callback) {
  // Throw an error if no arguments are passed
  if (!args) {
    return callback(new Error('Whoa! Something went wrong.'))
  } else {
    return setTimeout(
      // Just adding in a random number so it seems like the contrived asynchronous function
      // returned different data
      () => callback(null, {body: args + ' ' + Math.floor(Math.random() * 10)}),
      500,
    )
  }
}

// Nested asynchronous requests
function callbackHell() {
  asynchronousRequest('First', function first(error, response) {
    if (error) {
      console.log(error)
      return
    }
    console.log(response.body)
    asynchronousRequest('Second', function second(error, response) {
      if (error) {
        console.log(error)
        return
      }
      console.log(response.body)
      asynchronousRequest(null, function third(error, response) {
        if (error) {
          console.log(error)
          return
        }
        console.log(response.body)
      })
    })
  })
}

// Execute
callbackHell()
```
在此代码中，必须使每个函数都考虑可能的响应和可能的错误，使函数callbackHell在外表上令人困惑。

运行此代码将为您提供以下内容：
```
Output

First 9
Second 3
Error: Whoa! Something went wrong.
    at asynchronousRequest (<anonymous>:4:21)
    at second (<anonymous>:29:7)
    at <anonymous>:9:13
```
这种处理异步代码的方法很难遵循。 结果，在ES6中引入了promise概念。 这是下一部分的重点。

## Promises
一个promise表示异步功能的完成。 它是一个将来可能返回值的对象。 它实现了与回调函数相同的基本目标，但是具有许多其他功能和更易读的语法。 作为JavaScript开发人员，与创建承诺相比，您可能花费更多的时间消耗承诺，因为通常是异步Web API向开发人员返回承诺。 本教程将向您展示如何做到这两个。

### 创建一个Promise
您可以使用新的Promise语法初始化一个Promise，并且必须使用一个函数对其进行初始化。 传递给Promise的函数具有resolve和reject参数。 解析和拒绝功能分别处理操作的成功和失败。

编写以下行来声明一个promise：
```
// Initialize a promise
const promise = new Promise((resolve, reject) => {})
```
如果您使用网络浏览器的控制台在这种状态下检查已初始化的promise，则会发现它具有pending状态和undefined的值：
```
Output
__proto__: Promise
[[PromiseStatus]]: "pending"
[[PromiseValue]]: undefined
```
到目前为止，尚未为promise做出任何设置，因此它将永远处于pending状态。 检验promise的第一件事是通过用值解决承诺来实现承诺：
```
const promise = new Promise((resolve, reject) => {
  resolve('We did it!')
})
```
现在，检查承诺后，您会发现它的状态为fulfilled，并且将值设置为传递来解决的值：

```
Output
__proto__: Promise
[[PromiseStatus]]: "fulfilled"
[[PromiseValue]]: "We did it!"
```
如本节开头所述，promise是可能返回值的对象。 成功实现后，该值将从未定义变为填充数据。

一个承诺可以具有三种可能的状态：pending，fulfilled和rejected。

- Pending-解析或拒绝之前的初始状态
- Fulfilled-成功运作，诺言已解决
- Rejected-操作失败，承诺已被拒绝
在fulfilled或rejected后，promise便完成了。

现在您已经了解了如何创建promise，让我们看一下开发人员如何使用这些promises。

### 使用Promise
上一节中的Promise已实现了一个值，但是您还希望能够访问该值。 Promise有一个称为then的方法，该方法将在promise在代码中达到解析后运行。 然后会返回promise的值作为参数。

这是您返回并记录示例promise的值的方式：
```
promise.then((response) => {
  console.log(response)
})
```

您创建的诺言具有“我们做到了！”的[[PromiseValue]]。 此值将作为响应传递到匿名函数中：
```
Output
We did it!
```
到目前为止，您创建的示例尚未涉及异步Web API，仅说明了如何创建，解析和使用本机JavaScript Promise。 使用setTimeout，可以测试异步请求。

以下代码模拟了从异步请求返回的数据作为承诺：

```
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Resolving an asynchronous request!'), 2000)
})

// Log the result
promise.then((response) => {
  console.log(response)
})
```

使用then语法可确保仅在setTimeout操作在2000毫秒后完成时才记录响应。 所有这些都无需嵌套回调即可完成。

现在两秒钟后，它将解析promise值，然后将其打印：

```
Output
Resolving an asynchronous request!
```
promise也可以链接起来，以将数据传递给多个异步操作。 如果随后返回一个值，则可以添加另一个，然后该值将满足之前的返回值：
```
// Chain a promise
promise
  .then((firstResponse) => {
    // Return a new value for the next then
    return firstResponse + ' And chaining!'
  })
  .then((secondResponse) => {
    console.log(secondResponse)
  })
```
然后在第二秒中完成的响应将记录返回值：
```
Output
Resolving an asynchronous request! And chaining!
```
从那时起就可以链接起来，它使得对promise的使用比回调更同步，因为它们不需要嵌套。 这将允许可以更容易维护和验证的更具可读性的代码。

### 错误处理
到目前为止，您只能以处理成功的promise，这会使promise处于fulfilled状态。 但是，对于异步请求，通常还必须处理错误-如果API关闭，或者发送格式错误或未经授权的请求。 一个承诺应该能够处理这两种情况。 在本节中，您将创建一个函数来测试创建和使用promise的成功和错误情况。

此getUsers函数将标志传递给一个promise，并返回一个promise：
```
function getUsers(onSuccess) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Handle resolve and reject in the asynchronous API
    }, 1000)
  })
}
```
修改代码，以便如果onSuccess为true，则超时将满足一些数据。 如果为false，则函数将拒绝并显示错误：
```
function getUsers(onSuccess) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Handle resolve and reject in the asynchronous API
      if (onSuccess) {
        resolve([
          {id: 1, name: 'Jerry'},
          {id: 2, name: 'Elaine'},
          {id: 3, name: 'George'},
        ])
      } else {
        reject('Failed to fetch data!')
      }
    }, 1000)
  })
}
```

为了获得成功的结果，您将返回表示样本用户数据的JavaScript对象。

为了处理错误，您将使用catch实例方法。 这将为您提供失败回调，并以错误作为参数。

使用成功方法的then方法和错误的catch方法，将onSuccess设置为false来运行getUser命令：
```
// Run the getUsers function with the false flag to trigger an error
getUsers(false)
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```
由于已触发错误，因此将跳过，然后catch将处理该错误：
```
Output
Failed to fetch data!
```
如果切换标志并解析，则捕获将被忽略，而数据将返回：
```
// Run the getUsers function with the true flag to resolve successfully
getUsers(true)
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error)
  })
```
这将获得user数据：
```
Output
(3) [{…}, {…}, {…}]
0: {id: 1, name: "Jerry"}
1: {id: 2, name: "Elaine"}
3: {id: 3, name: "George"}
```

作为参考，下面是带有Promise对象的处理程序方法的表：

方法说明
- then（）处理一个解析。 返回promise，并异步调用onFulfilled函数
- catch（）处理拒绝。 返回一个Promise，并异步调用onRejected函数
- finally（）在实现诺言时调用。 返回一个promise，并异步调用onFinally函数

对于从未在异步环境中工作过的新开发人员和经验丰富的程序员而言，promise可能会造成混淆。 但是，如上所述，使用promise比创建promise更为普遍。 通常，浏览器的Web API或第三方库将提供承诺，而您只需要使用它即可。

在最后的Promise部分中，本教程将引用返回Promise的Web API的一个常见用例：[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)。

### 将Fetch API与Promises一起使用
返回promise的最有用且最常用的Web API之一是Fetch API，它使您可以通过网络发出异步资源请求。 提取过程分为两部分，因此需要链接。 此示例演示了如何通过GitHub API获取用户数据，同时还处理任何潜在错误：

```
// Fetch a user from the GitHub API
fetch('https://api.github.com/users/octocat')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })
```
fetch请求将发送到https://api.github.com/users/octocat URL，该URL异步等待响应。 然后，第一个将响应传递给匿名函数，该匿名函数将响应格式化为[JSON数据](https://www.digitalocean.com/community/tutorials/how-to-work-with-json-in-javascript)，然后 将JSON传递给秒，然后将数据记录到控制台。 catch语句将任何错误记录到控制台。

运行此代码将产生以下结果：
```
Output
login: "octocat",
id: 583231,
avatar_url: "https://avatars3.githubusercontent.com/u/583231?v=4"
blog: "https://github.blog"
company: "@github"
followers: 3203
...
```
这是从https://api.github.com/users/octocat请求的数据，以JSON格式呈现。

本教程的这一部分表明，promise对处理异步代码进行了许多改进。 但是，尽管使用then来处理异步动作比回调金字塔更容易遵循，但一些开发人员仍然喜欢编写异步代码的同步格式。 为了满足此需求，[ECMAScript 2016（ES7）](https://www.ecma-international.org/ecma-262/7.0/index.html)引入了async函数和await关键字，以使promise的实现更加容易。

## 具有async/await的异步函数
async函数允许您以看起来是同步的方式处理异步代码。 异步函数仍然在后台使用Promise，但是具有更传统的JavaScript语法。 在本节中，您将尝试使用此语法的示例。

您可以通过在函数之前添加async关键字来创建async函数：
```
// Create an async function
async function getUser() {
  return {}
}
```
尽管此函数尚未处理任何异步操作，但其行为与传统函数不同。 如果您执行该函数，则会发现该函数返回带有[[PromiseStatus]]和[[PromiseValue]]的promise，而不是返回值。

通过记录对getUser函数的调用来进行尝试：
```
console.log(getUser())
```
这将给出以下内容：
```
Output
__proto__: Promise
[[PromiseStatus]]: "fulfilled"
[[PromiseValue]]: Object
```
这意味着您可以使用处理promise的方式处理异步函数。 使用以下代码进行尝试：
```
getUser().then((response) => console.log(response))
```

对该getUser的调用将返回值传递给匿名函数，该函数将该值记录到控制台。

运行此程序时，您将收到以下信息：
```
Output
{}
```
异步函数可以使用await运算符处理在其中调用的promise。 await可以在异步函数中使用，并且将等待执行诺言，然后执行指定的代码。

有了这些知识，您可以使用async / await从上一节重写Fetch请求，如下所示：

```
// Handle fetch with async/await
async function getUser() {
  const response = await fetch('https://api.github.com/users/octocat')
  const data = await response.json()

  console.log(data)
}

// Execute async function
getUser()
```
此处的等待操作符确保在请求填充数据之前未记录数据。

现在可以在getUser函数内部处理最终数据，而无需使用then。 这是日志数据的输出：
```
Output
login: "octocat",
id: 583231,
avatar_url: "https://avatars3.githubusercontent.com/u/583231?v=4"
blog: "https://github.blog"
company: "@github"
followers: 3203
...
```

注意：在许多环境中，使用await必须使用异步-但是，某些新版本的浏览器和Node允许使用顶级await，这使您可以绕开创建异步函数来包装await。

最后，由于您正在处理异步函数中的已兑现承诺，因此您也可以处理函数中的错误。 而不是使用catch方法，您将使用[try/catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)模式 处理异常。

添加以下突出显示的代码：
```
// Handling success and errors with async/await
async function getUser() {
  try {
    // Handle success in try
    const response = await fetch('https://api.github.com/users/octocat')
    const data = await response.json()

    console.log(data)
  } catch (error) {
    // Handle error in catch
    console.error(error)
  }
}
```

如果程序收到错误，它将立即跳到catch块，并将该错误记录到控制台。

现代异步JavaScript代码通常是使用async/await语法处理的，但是了解Promise是如何工作的，这一点很重要，尤其是因为Promise能够提供async/await无法处理的其他功能，例如将promises与[ Promise.all（）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)。

注意：async/await可以通过结合生成器和promise来重现，以增加代码的灵活性。 要了解更多信息，请查看我们的JavaScript理解生成器教程。

## 总结
因为Web API通常会异步提供数据，所以学习如何处理异步操作的结果是成为JavaScript开发人员的重要组成部分。 在本文中，您学习了主机环境如何使用事件循环来处理具有堆栈和队列的代码的执行顺序。 您还尝试了使用回调，promise和async/await语法来处理异步事件成功或失败的三种方式的示例。 最后，您使用Fetch Web API来处理异步操作。

有关浏览器如何处理并行事件的更多信息，请阅读Mozilla开发人员网络上的[并发模型和事件循环](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)。 如果您想了解有关JavaScript的更多信息，请返回我们的[如何使用JavaScript编码](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript)系列。