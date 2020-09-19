原文地址：[Avoiding React setState() Pitfalls](https://duncanleung.com/avoiding-react-setstate-pitfalls/)   

I often read that setState() is one of the more misunderstood aspects of React.

Considering that managing component state is a fundamental aspect of React, I wanted to understand the common pitfalls and solutions around using setState().

First, a quick overview of setState() and its behavior.

## setState() Signature:
```
setState(updater, [callback]);
```

setState() takes two arguments.
- An updater

  - Either an object literal OR a function.
- An optional callback

  - setState() is asynchronous.
  - The callback is called when the Component state has actually updated.
Passing updater an Object Literal

  - Use the object literal pattern for simple state updates.
  - Passing an object literal is succinct.
```
  // Using an object literal in setState

  this.setState({
    selectedLang: "Javascript"
  });
```
Passing updater a Function
  - Use the updater function pattern when updates need to reference the previous state.
  - Passing an updater function provides access to prevState and current props.
  - prevState is a reference to the previous state. It should not be directly mutated.
The Updater Function Signature:
```
(prevState, props) => stateChange;

```
The updater function should build a new object based on the input from prevState and props
```
// Using an updater function in setState to build a new object

this.setState((prevState, props) => {
  return { counter: prevState.counter + props.increment };
});
```

## setState() Behavior:
When setState() is called it does two main things:

1. Queues changes to the component state (it is asynchronous)

  - Note: If an object literal is passed as an updater, React first merges the object you passed to setState() into the current state.
2. Tells React that the component (and children) needs to be re-rendered with the updated state.

  - React's reconciliation process

    - Create a new React Element tree (an object representation of the UI).
    - Diffs the new tree against the old tree.
    - Determines what changed, based on the updater passed to setState().
    - Updates the DOM.
  - Note: Use React's [lifecycle methods](https://facebook.github.io/react/docs/react-component.html#updating) to run code at different stages in reconciliation
  - [shouldComponentUpdate](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate): Allows determining if the component should update itself by inspecting the previous and new state.

    - If return false, then componentWillUpdate and componentDidUpdate are not executed. The component UI won't re-render.
    - this.state will still be updated within the component.
  - [componentWillUpdate](https://facebook.github.io/react/docs/react-component.html#componentwillupdate): Run any code before the new state is set and rendering happens
  - [render](https://facebook.github.io/react/docs/react-component.html#render): Render the updates visually to the DOM
  - [componentDidUpdate](https://facebook.github.io/react/docs/react-component.html#componentdidupdate): Run any code after the new state is set and the component has re-rendered


## Common Pitfalls with setState()  

### Pitfall 1: Trying to modify state directly
The first mistake with setState() is not using setState()! =)

  - Do not modify state directly.
  - Modifying this.state directly will not trigger a Component re-render.
  - The only place where this.state should be assigned is in the component's constructor.

```
// WRONG: This will not re-render the component

this.state.discount = false;
```

Solution: Use setState()
setState() will trigger a re-render of the Component.
```
// CORRECT: Use setState()

this.setState({
  discount: false
});
```
Aside: When should something be stored in Component state?

- If you don't use something in render(), it shouldn't be in this.state.


## Pitfall 2: Trying to use setState synchronously
setState() is asynchronous. Do not call setState on one line and assume the state has already changed on the next line.

  - setState() is a request to update state, rather than an immediate command to update state.
  - setState() does not always immediately update the component.
```
// WRONG: setState() should not be used synchronously

// assuming this.state = { orders: 0 }
this.setState({
  orders: 1
});

console.log(this.state.orders); // BUG! Prints out: 0
```

There are two solutions to this mistake:

  - Use the componentDidUpdate() lifecycle method (recommended by the React team).
  - Pass a callback as a second argument to setState().
Using componentDidUpdate or a setState callback (setState(updater, callback)) guarantees your code will execute after the state update has been applied.

### Solution 1: Use the componentDidUpdate() lifecycle method
componentDidUpdate() is invoked immediately after updating occurs (but is not called on the initial render of the Component).

```
// CORRECT: Use the componentDidUpdate() lifecycle method

componentDidUpdate(prevProps, prevState) {
  console.log(this.state.orders); // Prints out: 1
}
```

### Solution 2: Pass a callback function to setState()
The second parameter to setState() is an optional callback function that will be executed once setState is completed and the component is re-rendered.
```
// CORRECT: Pass a callback as a second argument to setState()

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

## Pitfall 3: Trying to use a previous value of state
setState() is asynchronous. Consequently, the vales of this.state should not be used for calculating the next state.

  - this.props and this.state may be updated asynchronously.
  - this.state should not be used to calculate the next state.
```
// WRONG: Don't rely on this.state to calculate the next state

this.setState({
  orders: this.state.orders + this.props.increment
});
```

### Solution: Use the updater function form to access prevState
The first argument of the updater function, prevState, provides access to the previous state:

Updater function signature:

```
(prevState, props) => stateChange;
```
```
// CORRECT: Use the updater function form to access prevState

this.setState((prevState, props) => ({
  orders: prevState.orders + props.increment
}));
```

## Pitfall 4: Trying to issue multiple setState() calls
Multiple setState() calls during the same cycle may be batched. This is specifically an issue when passing updater an object literal.

  - setState() performs a shallow merge of the updater object into the new state.
  - Subsequent setState() calls will override values from previous calls in the same cycle.
  - If the updater objects have the same keys, the value of the key, of the last object passed to Object.assign(), overrides the previous value.
```
// WRONG: Using an object literal with multiple setState calls during the same cycle will shallow merge the objects

// assuming this.state = { orders: 0 };
this.setState({ orders: this.state.orders + 1});
this.setState({ orders: this.state.orders + 1});
this.setState({ orders: this.state.orders + 1});

// --> OUTPUT: this.state.orders will be 1, not 3 as we would expect


// It is equivalent of an Object.assign, which performs a shallow merge
// The orders will only be incremented once

Object.assign(
  previousState,
  {orders: state.orders + 1},
  {orders: state.orders + 1},
  {orders: state.orders + 1},
  ...
)
```

### Solution: Use the updater function form to queue state updates
By passing updater a function, the updates will be queued and later executed in the order they were called.

```
//CORRECT: Use the updater function form to queue state updates

// assuming this.state = { orders : 0 };
this.setState(prevState => ({ orders: prevState.orders + 1 }));
this.setState(prevState => ({ orders: prevState.orders + 1 }));
this.setState(prevState => ({ orders: prevState.orders + 1 }));

// --> OUTPUT: this.state.orders will be 3
```