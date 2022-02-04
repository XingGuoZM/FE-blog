import {useEffect,useState} from 'react';

function Clickable (props){
  const {children} =props;
  return <div>
    {children}
  </div>
}

export default Clickable;