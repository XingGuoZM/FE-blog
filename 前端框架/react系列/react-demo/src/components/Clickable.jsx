import React from 'react';

function Clickable({onClick,children}){
  console.log(`rendering ${children}`)
  return <div onClick={onClick}>
    {children}
  </div>
}

export default React.memo(Clickable);