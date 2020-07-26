原文地址：[Why You Should Know JavaScript Closures](https://www.freecodecamp.org/news/javascript-closures/) 

![Why You Should Know JavaScript Closures](https://www.freecodecamp.org/news/content/images/size/w2000/2020/06/Why-JS-Closures-Matter.png)

深入理解闭包似乎是成为JavaScript开发者的必要条件。

之所以闭包很难理解的原因之一是它经常被反向学习。你可能知道闭包是什么，但是你可能不了解闭包在普通开发者当中或者自己的代码中有何用武之地。

那么，为什么闭包在我们日常的JavaScript代码中这么重要？

与其将闭包视为一种需要通过某种大众化的方式的记忆来理解闭包，不如让我们看看哪些步骤可以引导我们

首先理解一个闭包的含义。 一旦理解它们的含义之后，我们将揭示为什么闭包值得您了解并在JavaScript代码中加以利用。

是否想观看本课程？ 本教程是2020 JS Bootcamp的一部分，这是一个4小时以上的课程，向您展示如何通过大量实用的、无废话的课程来成为JavaScript专家的。 [在此处立即访问JS Bootcamp](https://jsbootcamp.io/course)


## 在实战中理解闭包 🔎  
假设我们正在仿照博客网站Medium制作一个app，我们希望每个用户可以喜欢不同的帖子。

无论何时一个用户点击了喜欢按钮，它的值都会加一次。

可以想象为Medium网站中的”拍手“的按钮: 

![demo](https://raw.githubusercontent.com/kikobeats/react-clap-button/HEAD/demo.gif)

每次操作都会增加1的函数叫 handleLikePost，跟踪喜欢的数量的变量命名为likeCount
```
// global scope
let likeCount = 0;

function handleLikePost() {
  // function scope
  likeCount = likeCount + 1;
}

handleLikePost();
console.log("like count:", likeCount); // like count: 1
```

每当用户喜欢了一个帖子，我们调用一次handleLikePost并且likeCount加1.

之所以可行是因为函数可以访问相对于当前函数外部的变量。

换句话说，函数中可以访问任何父作用域中的变量。

但是，此代码有一个问题。likeCount是在全局作用域而不在任何函数中，likeCount是一个全局变量。全局变量可以被app中的任何其他代码或者函数里面使用（或修改）。

例如，如果在函数调用之后，我们错误的将likeCount设置为0，会发生什么呢？
```
let likeCount = 0;

function handleLikePost() {
  likeCount = likeCount + 1;
}

handleLikePost();
likeCount = 0;
console.log("like count:", likeCount); // like count: 0
```

显然，likeCount永远不会增加，一直为0.

当只有一个函数中需要给定的数据时，它只需要存在于局部，在该函数内部。

现在，我们把likeCount放到我们的函数内部:
```
function handleLikePost() {
  // likeCount moved from global scope to function scope
  let likeCount = 0;
  likeCount = likeCount + 1;
}
```

请注意，在增加likeCount的地方有一种更加简短的写法。与其让likeCount等于之前likeCount的值加1，不如我们直接可以使用 += 操作符:
```
function handleLikePost() {
  let likeCount = 0;
  likeCount += 1;
}
```

为了执行效果和之前一样获得喜欢的数量，我们还需要将console.log加入到该函数中。
```
function handleLikePost() {
  let likeCount = 0;
  likeCount += 1;
  console.log("like count:", likeCount);
}
handleLikePost(); // like count: 1
```

它仍然和之前的效果一样。

现在用户应该可以根据自己的意愿来喜欢帖子多次，因此让我们多次调用handleLikePost
```
handleLikePost(); // like count: 1
handleLikePost(); // like count: 1
handleLikePost(); // like count: 1
```

但是当我们执行代码的时候，出现了问题。

我们预期likeCount会持续增加，但是我们每次看到的都是1，为什么会这样？

花点时间看下我们的代码，尝试解释为什么likeCount不再增加。

让我们看一下handleLikePost函数以及它是如何执行的
```
function handleLikePost() {
  let likeCount = 0;
  likeCount += 1;
  console.log("like count:", likeCount);
}
```

每次我们使用它，我们都重新创建初始值为0的likeCount变量。

难怪我们无法跟踪函数调用之间的计数！它每次都是设置成0，然后增加1，最后函数执行完毕。

我们被困在这里了。我们的变量需要在handleLikePost中不被销毁，但是我们不能保留这个计数。

在函数调用时，我们需要有个东西来保留或记住的likeCount值。

如果我们尝试一些看起来有些陌生的东西，如果我们尝试将另一个函数添加进我们的当前函数中，会怎么样呢？
```
function handleLikePost() {
  let likeCount = 0;
  likeCount += 1;
  function() {

  }
}

handleLikePost();
```

这里我们将这个函数命名为addLike.什么原因呢？因为它将负责增加likeCount的值。

请注意，这个内部函数不是一定需要命名的，它可以是一个匿名函数。在大多数场合是这样的。我们给它取个名字以至于我们可以更轻易的谈论它以及它的作用。

现在addLike将会增加我们的likeCount，因此我们将增加1的那一行代码移到内部函数中。
```
function handleLikePost() {
  let likeCount = 0;
  function addLike() {
    likeCount += 1;
  }
}
```

如果我们在hanleLikePost中调用addLike函数，会怎么样呢？

将会发生的一切就是addLike将增加我们的likeCount，但是likeCount变量仍然会被破坏。 因此，我们将再次失去它的值，结果为0。

但是，与其在函数的外部调用addLike，如果在函数外部调用addLike，会怎样呢？ 这似乎更陌生。 那我们该怎么做呢？

至此我们知道函数会返回值。 例如，我们可以在handleLikePost的末尾返回likeCount值，以将其传递给程序的其他部分：
```
function handleLikePost() {
  let likeCount = 0;
  function addLike() {
    likeCount += 1;
  }
  addLike();
  return likeCount;
}
```
然而，除此之外，让我们在addLike中返回likeCount，然后返回addLike函数本身：
```
function handleLikePost() {
  let likeCount = 0;
  return function addLike() {
    likeCount += 1;
    return likeCount;
  };
  // addLike();
}

handleLikePost();
```

现在看起来很奇怪，但是这在js中是允许的。我们可以像使用其他任何值一样使用函数。这意味着，一个函数可以从另外一个函数返回，通过内部返回函数，我们可以从其封闭的函数外部调用它。

但是我们该怎么做呢？仔细思考一下，看看是否能解决...

首先，为了更好理解正在发生的情况，当我们调用它时，让我们通过console.log（handleLikePost）来查看得到的结果：
```
function handleLikePost() {
  let likeCount = 0;
  return function addLike() {
    likeCount += 1;
    return likeCount;
  };
}

console.log(handleLikePost()); // ƒ addLike()
```

并不奇怪，我们打印记录了addLike函数，为什么呢？毕竟，因为我们只返回了它。

为了调用它，我们不能只是将它赋值给另外一个变量吗？就像我刚才说的，在js中，函数可以像其他任何值一样使用。如果我们可以从函数中返回它，也可以将它放入变量中。因此我们将其放入一个新的变量中，例如：
```
function handleLikePost() {
  let likeCount = 0;
  return function addLike() {
    likeCount += 1;
    return likeCount;
  };
}

const like = handleLikePost();
```

最后，让我们调用一下like，我们多执行几次，然后console.log每次的结果：

```
function handleLikePost() {
  let likeCount = 0;
  return function addLike() {
    likeCount += 1;
    return likeCount;
  };
}

const like = handleLikePost();

console.log(like()); // 1
console.log(like()); // 2
console.log(like()); // 3
```

我们的likeCount终于被保存了！每次执行like，likeCount都从原来的值递增。

那么，这里发生了什么呢？ 好了，我们弄清楚了如何从声明范围之外的地方调用addLike函数。 通过从外部函数返回内部函数并存储对该函数的引用（命名为like）来调用它，我们可以做到这一点。

## 闭包如何工作的，一行一行看📝  
所以这就是我们的实现，但是如何在函数调用之间保留likeCount的值呢？
```
function handleLikePost() {
  let likeCount = 0;
  return function addLike() {
    likeCount += 1;
    return likeCount;
  };
}

const like = handleLikePost();

console.log(like()); // 1
```

1.执行handleLikePost外部函数，创建内部函数addLike的实例；该函数将隔离变量likeCount，这在上面的作用域范围之内。
2.我们在声明它的范围之外调用了addLike函数。通过从外部函数返回内部函数并存储对该函数的引用（命名为like）来调用它，我们可以做到这一点。
3.当like函数完成运行时，通常我们希望它的所有变量都被垃圾回收（从内存中删除，这是JS编译器执行的自动过程）。我们希望当函数完成时，每个likeCount都会消失，但事实并非如此。

是什么原因呢？闭包。

由于内部函数实例仍处于活动状态（分配给类似对象），因此闭包仍保留countLike变量。

您会认为，用另一个函数编写的函数就像在全局范围内编写的函数一样。但事实并非如此。

这就是闭包使函数如此强大的原因，因为闭包是一种特殊的属性，在语言中没有其他属性。

## 变量的生命周期  
为了更好地理解闭包，我们必须了解JavaScript如何对待创建的变量。 您可能想知道在关闭页面或转到应用程序中的另一页面时变量会发生什么。 变量存活多长时间？

全局变量一直存在，直到放弃该程序为止（例如，当您关闭窗口时）。 它们在程序的整个生命周期中都存在。

但是，局部变量寿命短。 它们在调用函数时创建，并在函数完成时删除。

因此在运行该函数之前，likeCount只是一个局部变量。 likeCount变量是在函数的开头创建的，一旦执行完毕便销毁。

## 闭包不是快照 - 他们将局部变量保留下来  
有时会有这样的言论，JavaScript的闭包类似快照，在某个特定时间点的照片。这是一种误解，我们可以通过在喜欢按钮上添加其他功能来推翻反驳它。  

假设在极少数情况下，我们希望允许用户对帖子“加倍赞”，并将likeCount一次增加2，而不是1。

我们将如何添加此功能？

将值传递给函数的另一种方法当然是通过参数，参数的作用就像局部变量一样。

让我们向函数传递一个名为step的参数，该参数将允许我们提供一个动态的，可变的值来增加计数，而不是固定的值1。
```
function handleLikePost(step) {
  let likeCount = 0;
  return function addLike() {
    likeCount += step;
    // likeCount += 1;
    return likeCount;
  };
}
```

接下来，让我们尝试创建一个特殊功能，该功能使我们可以让帖子一样喜欢加倍，比如doubleLike。 我们将传入2作为我们的步长值，然后尝试调用我们的两个函数（如doubleLike）：
```
function handleLikePost(step) {
  let likeCount = 0;
  return function addLike() {
    likeCount += step;
    return likeCount;
  };
}

const like = handleLikePost(1);
const doubleLike = handleLikePost(2);

like(); // 1
like(); // 2

doubleLike(); // 2 (the count is still being preserved!)
doubleLike(); // 4
```

我们看到likeCount也被保留为doubleLike。

这里发生了什么事？

内部addLike函数的每个实例都从其外部handleLikePost函数的作用域关闭likeCount和step变量。 步骤随着时间的推移保持不变，但是在每次调用该内部函数时都会更新计数。 由于闭包不仅遍历变量，而且还覆盖值的快照，因此这些更新将在函数调用时保留。

那么这段代码向我们展示了什么—我们可以传入动态值来更改函数结果的事实？ 他们还活着！ 闭包使本应保留很长时间的函数中的局部变量保持活动状态。

换句话说，它们不是静态不变的，就像某个时间点上已关闭变量的值的快照一样，闭包保留变量并提供与其的活动链接。 结果，我们可以使用闭包来观察或随时间更新这些变量。

## 到底闭包是什么呢？
既然您已经了解了闭包的作用，那么对于要成为闭包的东西有两个标准，您在这里都看到了两个标准：

1. 闭包是JavaScript函数的属性，并且仅是函数。 没有其他数据类型有这种特性。
2. 要观察闭包，您必须在与最初定义该函数不同的范围内执行一个函数。

## 为什么要知道闭包？
让我们回答我们要回答的原始问题。 基于我们所看到的，暂停并尝试回答这个问题。 作为JS开发者，我们为什么要关心闭包？

闭包对您和您的代码很重要，因为闭包允许您“记住”值，这是仅函数式语言中非常强大且独特的功能。

在此示例中，我们在这里看到了它。 毕竟，不记得点赞的点赞计数变量有什么用？ 您在JS生涯中经常会遇到这种情况。 您需要以某种方式保持某种价值，并可能将其与其他价值分开。 你用什么？ 一个函数。 为什么？ 通过闭包来跟踪一段时间内的数据状态。

这样一来，您已经领先于其他开发者。