import React, { useEffect } from 'react';
import styles from './hello.css';
function Hello() {
  useEffect(() => {
    console.log('hello，world')
    console.log(styles)
  }, [])
  return <div>hello</div>
}
export default Hello;