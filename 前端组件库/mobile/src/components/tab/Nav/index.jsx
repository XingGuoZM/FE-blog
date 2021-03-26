import { useState, useEffect, useRef } from 'react';
import { throttle } from '../../../util'
import './index.css';

export default function Nav(props) {
  const { data, navItem, tabNav, index } = props;
  const [fixStyle, setFixStyle] = useState({});
  const navRef = useRef();

  useEffect(() => {
    window.addEventListener('scroll', throttle(() => handleScroll(), 100))
  }, []);
  function handleScroll() {

    const { top } = navRef.current.getBoundingClientRect();
    console.log(top);
    if (top < 0) {
      setFixStyle({ position: 'fixed', top: 0 });
    } else {
      setFixStyle({ position: 'static' });
    }
  }
  function renderItem() {
    if (!!tabNav.navItem) {
      return navItem(data);
    }
    return data.map((item, i) => <div
      key={item.id}
      className={index === i ? 'tab-nav-active-item' : 'tab-nav-item'}>
      {item.name}
    </div>);
  }

  return <div className="tab-nav" style={fixStyle} ref={navRef}>
    {renderItem()}
  </div>
}