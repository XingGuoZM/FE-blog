import { useEffect } from 'react';

function TestEffect(props) {
  const { visible } = props;
  useEffect(() => {
    console.log('hallo');
  }, []);

  return <div>
    {visible ? '123' : '345'}
  </div>
}

export default TestEffect;