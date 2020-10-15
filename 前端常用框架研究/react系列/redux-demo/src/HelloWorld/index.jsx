import React from 'react'
import {connect} from 'react-redux'

class HelloWorld extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
      return <div>{this.props.title}</div>
  }
}

export default connect()(HelloWorld)