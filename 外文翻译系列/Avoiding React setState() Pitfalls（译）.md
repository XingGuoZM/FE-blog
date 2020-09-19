原文地址：[Avoiding React setState() Pitfalls](https://duncanleung.com/avoiding-react-setstate-pitfalls/)  

我经常会阅读到setState()是React中容易让人误解方面之一的相关的内容  

考虑到管理组件状态是React的一个基础能力，我想了解一下有关使用setState()的常见陷阱和解决方案。  

首先，快速概览setState()和它的行为表现  

## setState()使用说明:  
```
setState(updater, [callback]);
```

setState（）接收两个参数
- 一个更新器  
  - 一个对象(对象更新器)或者一个函数(函数更新器)  
- 一个回调函数  
  - setState() 是异步的.
  - 组件状态实际更新后将调用该回调

传递的更新器是一个对象时
  - 使用对象类型模式进行简单的状态更新  
  - 传递的对象类型是简单的
```
  // Using an object literal in setState

  this.setState({
    selectedLang: "Javascript"
  });
```
传递的更新器是一个函数时  
  - 当更新需要引用以前的状态时，请使用函数模式。
  - 传递更新对象是函数时可访问prevState和当前props。
  - prevState是对先前状态的引用。 它不应该直接突变。  
函数模式的使用说明
```
(prevState, props) => stateChange;

```

函数模式是基于传入的prevState和props来创建一个新对象

```
// Using an updater function in setState to build a new object

this.setState((prevState, props) => {
  return { counter: prevState.counter + props.increment };
});
```
## setState() 表现行为:

当setState()被调用时，它将完成两件事：
  1.  排队更改组件的状态（它是异步的）
    - 注意：如果传入的是一个对象，React首先会将传递给setState()的对象合并到当前状态  
  2. 当状态更新时，告诉React组件和它的子组件重新渲染  
    - React的比对流程  
      - 创建一个新的React元素树（UI的对象表示）  
      - 比较新树和老树的区别  
      - 根据传递给setState()更新对象来确定更改的内容  
      - 更新DOM  
    - 注意：在比对时，使用React[生命周期函数](https://facebook.github.io/react/docs/react-component.html#updating) 的不同阶段运行代码

    - [shouldComponentUpdate](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate): 允许通过检查先前状态和新状态来确定组件是否应更新自身。
      - 如果返回false，componentWillUpdate和componentDidUpdate不会执行。组件UI不会再渲染。
      - 在组件内，this.setState仍然会被更新。
    - [componentWillUpdate](https://facebook.github.io/react/docs/react-component.html#componentwillupdate):在设置新状态和进行渲染之前运行任何代码
    - [render](https://facebook.github.io/react/docs/react-component.html#render): 可视化地更新到DOM 
    - [componentDidUpdate](https://facebook.github.io/react/docs/react-component.html#componentdidupdate): 新状态设置完成并重新渲染组件后，运行代码。

## setState()常见的陷阱  

### 陷阱 1: 尝试直接修改状态  
第一个错误,没有使用setState()
  - 不要直接修改状态
  - 直接修改this.state不会触发组件重新渲染
  - this.state唯一应该存在的地方是组件的构造函数中  
```
// 错误的写法: 不会出发组件重新渲染

this.state.discount = false;
```

解决方案：使用setState()  
setState() 会触发组件的重新渲染.
```
// 正确的写法: Use setState()

this.setState({
  discount: false
});
```
扩展：什么时候应该把变量存放在组件的state里？

- 如果在render()里没有用到，this.state里不应该存在

## 陷阱2: 尝试同步使用setState  
setState()是异步的。 不要在一行上调用setState并预期该状态在下一行上更改完成。

  - setState()是更新状态的请求，而不是立即更新状态的命令。
  - setState()并不总是立即更新组件。
```
// 错误的写法: setState()不应该同步使用

// assuming this.state = { orders: 0 }
this.setState({
  orders: 1
});

console.log(this.state.orders); // BUG! Prints out: 0
```
有2中解决方案来解决这个问题: 
  - 使用componentDidUpdate()生命周期方法（React团队推荐）。
  - 定义一个回调函数作为第二个参数传递给setState()。

使用componentDidUpdate或setState回调（setState(updater，callback)）可以确保您的代码将在应用状态更新后执行。

### 解决方案 1: 使用生命周期函数componentDidUpdate()  
发生更新后会立即调用componentDidUpdate()（但不会在Component的首次渲染上调用）。

```
// 正确的写法: 使用生命周期函数 componentDidUpdate() 

componentDidUpdate(prevProps, prevState) {
  console.log(this.state.orders); // Prints out: 1
}
```

### 解决方案 2: 通过给setState()传入一个回调函数  
setState()的第二个参数是可选的回调函数，将在setState完成并重新渲染组件后执行。
```
// 正确的写法: 将回调函数作为第2个参数传递给setState()

// assuming this.state = { orders: 0 }
this.setState(
  {
    orders: 1
  },
  () => {
    console.log(this.state.orders); // Prints out: 1
  }
);
```

## 陷阱 3: 尝试使用stat保存前一个状态值  
setState()是异步的。 因此，不应将this.state的值用于计算下一个状态。
  - this.props和this.state可能被异步更新。
  - this.state不应用于计算下一个状态。
```
// 错误的写法: 不要依赖this.setState来计算下一个状态值

this.setState({
  orders: this.state.orders + this.props.increment
});
```

### 解决方案: 使用函数更新器方式来获取前一个状态值  
函数更新器的第一个参数，提供了对先前状态的访问:

函数更新器的用法
```
(prevState, props) => stateChange;
```

```
// 正确的写法: 使用函数更新器方式来获取前一个状态值

this.setState((prevState, props) => ({
  orders: prevState.orders + props.increment
}));
```

## 陷阱 4: 尝试发出多个setState()调用  
同一周期内的多个setState()调用可能会被批量处理。 当向更新器传递对象时，这个问题尤为明显。

  - setState()将更新程序对象浅合并到新状态。
  - 后续的setState()调用将覆盖同一周期中先前调用的值。
  - 如果更新器对象具有相同的keys，则传递给Object.assign()的最后一个对象的键值将覆盖先前的值。

```
// 错误的写法: 在同一周期内使用对象更新器多次调用setState(),将会被浅合并
// 假设 this.state = { orders: 0 };
this.setState({ orders: this.state.orders + 1});
this.setState({ orders: this.state.orders + 1});
this.setState({ orders: this.state.orders + 1});

// --> 输出: this.state.orders 将会是 1, 不是我们预期的 3 

// 这等同于使用 Object.assign ,执行了一次浅合并
// orders只被增加了一次

Object.assign(
  previousState,
  {orders: state.orders + 1},
  {orders: state.orders + 1},
  {orders: state.orders + 1},
  ...
)
```

### 解决方案: 使用函数更新器来将状态依次更新  

通过向更新器传入一个函数，需要更新的值将排队更新，然后按调用顺序执行。

```
//正确的写法: 使用函数更新器来排队更新状态

// 假设 this.state = { orders : 0 };
this.setState(prevState => ({ orders: prevState.orders + 1 }));
this.setState(prevState => ({ orders: prevState.orders + 1 }));
this.setState(prevState => ({ orders: prevState.orders + 1 }));

// --> 输出: this.state.orders 将会是 3
```