原文地址：[React Hooks: everything you need to know! 🚀](https://softwareontheroad.com/react-hooks/)

Starting of React 16.8.0 there are new ways to call async code in an elegant way, reuse logic between components much more easily.

As a reactjs developer, is your duty to stay up to date with the new react framework features. Not to please your boss but to stay relevant in the field and the market.

I still remember good old days when nobody was talking about the redux pattern and my react apps were a state mess (mid 2014).

When the flux pattern was introduced at first it was hard to understand and seems very complicated to implement, but now a few years later is the standard in every react framework based project.

With react hooks will happen the same, is the replacement for class components and the future of react framework.

All right this is gonna be a long post, so I added a table of content so you can read a little, then continue working on your project, and come back later when you need a break.

I’m the only one who reads technical articles to clean my mind and release stress from my day-to-day work ?

## Table of contents
- What are React hooks anyway?
- React Hook vs React Class
- The existing React hooks
- Notation
- The useState hook
- The useEffect hook
- The useReducer hook
- The useRef hook
- Separation of concerns
- Advance use cases
- Real world examples
  - Show online status
  - Track geolocation
- Awesome resources
- Conclusion

## What are React hooks anyway? 🤔
When you work with Reactjs class components you can use state, that’s why these components are also called stateful, also every class component has lifecycle methods like: componentDidMount(), componentDidUpdate(), and so on.

You can’t use any of this in functional components. Functional components can’t use their own state and don’t have lifecycle methods.

### Now with React hooks you can.

React hooks allows us to take a Reactjs functional component and add state and lifecycle methods to it.

In simple words, React hooks are special functions to extend the capabilities of functional components and give them the possibility to have lifecycle events and manage state.

Let’s compare how a class differs from a functional component when React hooks are used.

## The good old fashion class-based way
```
import React from 'react';
class ClickCounter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0 // Initial value for our counter
    };
  }

  setCount(numb) {
    this.setState({
      count: numb
    })
  }

  render() {
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => this.setCount(this.state.count + 1).bind(this)}>
          Click me
        </button>
      </div>
    );
  }
}
```
## With React hooks
```
import React, { useState } from 'react';
function ClickCounter() {
  /** 
    useState creates a "count" variable that will store the state and a "setCount" function that will mute the "count" variable state.
  **/
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
Example using useState hook to store state in a function component

### Fewer lines of code to do the same thing!

But is not just that, with React hooks you can now reuse stateful logic and have a better separation of concerns.

At first, this new API may appear weird to you but stay with me, you will learn how to get the most out of it.

## The existing React hooks 🍱
The new API comes with two main pre-existing hooks, and some others for other use cases

### Basics React hooks
The foundation of all React hooks, every other hook you will see is a variation of these three or are using them as primitives.

- The useState is the State hook use it for declaring the state in your components
- The useEffect is the Side effects hook use it for data fetching, manually changing the DOM, and etc.
- The useContext use it in conjunction with Reactjs Context API. When the React Context provider updates, this hook will trigger render with the latest context value.
### Advance React hooks
These are the most important of the other built-in React hooks that come with the library.

The useReducer is an alternative to useState, you should use it when you have complex state logic, if you’re familiar with Redux you will like it.
The useRef use it for accessing a DOM element with a mutable ref object. Is more useful than the ref attribute

### Those peculiar brackets
You might be asking what the syntax const [age, setAge] = useState(24) means, but is just the new way to destructuring an array, let me show you another way to do it.
```
const ageStateVariable = useState(24); // Returns a tuple or an array of length 2
const age = ageStateVariable[0]; // First item
const setAge = ageStateVariable[1]; // Second item

// ES6 way to do this
const [age, setAge] = useState(24);
```
I love simple and elegant one-liners, not as much as python people, and definitively I do NOT like insane one-liners as python people

### Rules
- Never call Hooks from inside a loop, condition or nested function
- Never call a Hook from a regular function
- Only call them inside functions components or custom hooks
- Hooks should sit at the top level of your component
- Hooks can call other Hooks


## The useState hook 🎲
The easiest to use and understand all the hooks. Its purpose is to store the state in a functional component.

Well, technically we are not storing state inside it, but hooking into the dictionary (key-value) of states that are handled by the react library under the hood. But we are not going to deep into that details for now
```
import React, { useState } from 'react';

function myAwesomeComponent () {
  const [name, setName] = useState('John');
  ...
}
```
The useState returns a tuple with a state holder property and a setter method.

You invoke useState with the initial value for your state.

To update the state you call the setName function

## The useEffect hook 🍯
In a React class, you would typically set up a subscription in componentDidMount, and clean it up in componentWillUnmount.

With react hook useEffect we perform this by returning a function to clean up or unsubscribe the effect.

If you have worked with mobx this pattern may result familiar to you, it’s an analogy to a reaction.
```
  useEffect(() => {
    PlacesAPI.subscribeToPlaceNews(props.place.id, handlePlacesNews);
    return () => {
      PlacesAPI.unsubscribeFromPlaceNews(props.place.id, handlePlacesNews);
    };
  });
```

### Why did we return a function from our effect?
This is the optional cleanup mechanism for effects. Every effect may return a function that cleans up after it.

This lets us keep the logic for adding and removing subscriptions close to each other.


## The useReducer hook 🎣
When you have complex state logic, it’s a good idea to use a reducer. If you are familiar with libraries like Redux or the flux pattern you will understand this at first glance.

![Redux pattern architecture](https://softwareontheroad.com/static/cc42e4c933257142e04a2a965d63549b/8299d/redux-pattern.jpg)

Basically with a reducer you dispatch or trigger some actions in your view, those events are listened by a reducer who has the logic inside to update the store which is where your state lives. Now when the store is updated, your component will rerender.
```
import React, { useReducer, useState } from 'react';
import produce from 'immer';

function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return produce(state, (draftState) => {
        draftState[action.payload].isCompleted = !draftState[action.payload].isCompleted;
      });
    case 'add':
      return produce(state, (draftState) => {
        draftState.push({ label: action.payload });
      });
    default:
      return state;
  }
}

function Todo({ isCompleted, label, onChange }) {
  return <p>
    <label style={{
      textDecoration: isCompleted && 'line-through'
    }}>
      <input
        type="checkbox"
        checked={isCompleted || false}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  </p>
}

function TodoList() {
  const todos = [
    { label: 'Do something' },
    { label: 'Buy dinner' }
  ];

  const [state, dispatch] = useReducer(reducer, todos);
  const [newTodo, setNewTodo] = useState('');

  return <>
    {state.map((todo, i) => (
      <Todo
        key={i}
        {...todo}
        onChange={() => dispatch({ type: 'toggle', payload: i })}
      />
    ))}
    <input
      type="text"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
    />
    <button onClick={() => {
      dispatch({ type: 'add', payload: newTodo });
      setNewTodo('');
    }}>
      Add
    </button>
  </>;
}

export default TodoList;
```

## The useRef hook 🔮
Refs are used to access React elements or DOM elements rendered in the render function. The hook useRef returns a mutable ref object whose .current property is initialized to the passed argument initialValue. It’s very simple to use
```
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

## Separation of concerns 🎎
![Mantain your code organized](https://softwareontheroad.com/static/21b6e7aca21ca4ec6e385ba2f095b55c/52745/organized.jpg)

With Hooks, you can extract stateful logic from a component so it can be tested independently and reused.

Hooks allow you to reuse stateful logic without changing your component hierarchy.

Example, components might perform some data fetching in componentDidMount and componentDidUpdate.

However, the same componentDidMount method might also contain unrelated logic that sets up event listeners, with cleanup performed in componentWillUnmount.

Mutually related code that changes together gets split apart, but completely unrelated code ends up combined in a single method.
```
  import React from 'react';
  import PlacesAPI from '../services/place';
  class PlaceNewsWithCounter extends React.Component {
    constructor(props) {
      super(props);
      this.handlePlacesNews = this.handlePlacesNews.bind(this);
      this.state = { count: 0, currentEvent: null };
    }

    // Unrelated stateful logic
    componentDidMount() {
      document.title = `You clicked ${this.state.count} times`;
      PlacesAPI.subscribeToPlaceNews(
        this.props.place.id,
        this.handlePlacesNews
      );
    }

    componentDidUpdate() {
      document.title = `You clicked ${this.state.count} times`;
    }

    componentWillUnmount() {
      PlacesAPI.unsubscribeFromPlaceNews(
        this.props.place.id,
        this.handlePlacesNews
      );
    }

    handlePlacesNews(place) {
      this.setState({
        currentEvent: place.currentEvent
      });
    }
    ...
  }
  ```
### A better approach using React hooks
```
  import React, { useState, useEffect } from 'react';
  import PlacesAPI from '../services/place';
  function PlaceNewsWithCounter() {

    // Logic for counter here...
    const [count, setCount] = useState(0);
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    });


    // Logic for place API here...
    const [currentEvent, setCurrentEvent] = useState(null);

    function handlePlacesNews(place) {
      setCurrentEvent(place.currentEvent);
    }

    useEffect(() => {
      PlacesAPI.subscribeToPlaceNews(props.place.id, handlePlacesNews);

      return () => {
        PlacesAPI.unsubscribeFromPlaceNews(props.place.id, handlePlacesNews);
      };
    });


    return ...;
  }
```

### Advance use cases 🤵
![Like a boss](https://softwareontheroad.com/static/b90db285cdfad6a4d2d01aa383ea4f94/0d89d/professional.jpg)

### Using useEffect for data fetching
With the combination of useEffect and useState, you can make API calls by using useEffect and passing in an empty array or object as the second argument to have the same behavior as componentDidMount

The key here is the second argument. If you don’t provide an empty array or object as the second argument, the API call will be called on every render, and it effectively becomes the same as a componentDidUpdate
```
  const [todo, setTodo] = useState(null);
  const [id, setId] = useState(1);
  
  useEffect(() => {
    if (!id) {
      return;
    }
    
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(results => results.json())
      .then(data => {
        setTodo(data);
      });
  }, [id]);  // Don't forget to add this!
```
By passing a second parameter to useEffect we are setting a subscription whenever the id property change the effect will be retriggered

If instead, we would like to make an API call ONLY when the component is mounted
```
const [fullName, setFullName] = useState(null);

useEffect(() => {
  fetch('https://randomuser.me/api/')
    .then(results => results.json())
    .then(data => {
      const {name} = data.results[0];
      setFullName(`${name.first} ${name.last}`);
    });
}, []); // <-- Have to pass in [] here!
```