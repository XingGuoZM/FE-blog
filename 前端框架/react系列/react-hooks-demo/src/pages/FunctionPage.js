import React from 'react';

export function FunctionPage(props) {
  const showCount= () => {
     console.log(props.count);
   };
  const handleClick = () => {
     setTimeout(showCount, 3000);
   };
  return (
  <button onClick={handleClick}>function component:{props.count}</button>
   );
 }
