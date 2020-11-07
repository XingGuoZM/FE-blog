import React from 'react'
import { connect } from 'react-redux'

function TodoList(props) {
    const { value, add } = props;
    return (
      <div>
        <input onKeyUp={add}></input>
        <h1>{value}</h1>
      </div>
    )
}
const mapStateToProps = (state) =>({value: state.value});
const mapDispatchToProps = (dispatch) => ({add:(e)=>e.keyCode===13 && dispatch({ type: 'add',value:e.target.value})});
export default connect(mapStateToProps,mapDispatchToProps)(TodoList)
