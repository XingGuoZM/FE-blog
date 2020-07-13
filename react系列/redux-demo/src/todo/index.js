import React from 'react'
import {render} from 'react-dom'
import rootReducer from './reducers'
import {createStore} from 'redux'

const store=createStore(rootReducer)

class Todo extends React.Component{
  render(){
    return (
      <div>hello</div>
    )
  }
}

export default Todo
