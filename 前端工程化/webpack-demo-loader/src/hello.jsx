import { useEffect } from 'react';

function Hello() {
  useEffect(() => {
    console.log('hello')
  }, [])
  return <div>hello</div>
}
export default Hello;