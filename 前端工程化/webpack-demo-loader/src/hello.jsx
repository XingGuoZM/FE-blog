import { useEffect } from 'react';
import styles from './hello.css';
function Hello() {
  useEffect(() => {
    console.log('hello')
  }, [])
  return <div className={styles.wrap}>hello</div>
}
export default Hello;