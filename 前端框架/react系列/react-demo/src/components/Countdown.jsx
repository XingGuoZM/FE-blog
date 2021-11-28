import React from 'react';

function Countdown(props){
  const{hour,minute,second,onClick}=props;
  console.log('counting')
  return <div onClick={onClick}>{`${hour}:${minute}:${second}`}</div>
}

export default Countdown;