import React from 'react';
import { connect } from 'react-redux';

function App(props) {
  const {timer, add, minus} = props;
  return (
    <div className="App">
      <h1>{timer}</h1>
      <button onClick={add}>plus</button>
      <button onClick={minus}>minus</button>
    </div>
  );
}

const mapStateToProps = (state) =>({timer: state.timer});
const mapDispatchToProps = (dispatch) => ({
  add: ()=>dispatch({ type: 'add' }),
  minus: ()=>dispatch({ type: 'minus' }),
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
