import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('执行...', count);
    return () => {
      console.log('清理...', count)
    }
  }, [count]);
  return <div>
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => { setCount(count + 1); setCount(count + 1); }}>
        Click me
      </button>
    </div>
  </div>
}

export default Counter;