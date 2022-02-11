import React from 'react';

export class ClassPage extends React.Component {
  showCount = () => {
    console.log(this.props.count);
  }; 
  handleClick = () => {
    setTimeout(this.showCount, 3000);
  };
  render() {
  return <button onClick={this.handleClick}>class component:{this.props.count}</button>;
  }
}