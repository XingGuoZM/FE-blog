import { useState, useEffect, useRef } from 'react';
import './index.css';


export default function Nav(props) {
  const { data, navItem, tabNav,index } = props;
  const navRef = useRef();
  let fixStyle = {};
  useEffect(() => {
    // const { top } = navRef.current.getBoundingClientRect();
    // if (top === 0) {
    //   fixStyle = {
    //     position: 'absolute',
    //     zIndex: 2
    //   }
    // }
  });
  function renderItem() {
    if (!!tabNav.navItem) {
      return navItem(data);
    }
    return data.map((item, i) => <div
      key={item.id}
      className={index===i ? 'tab-nav-active-item':'tab-nav-item'}>
      {item.name}
    </div>);
  }

  return <div className="tab-nav" style={fixStyle} ref={navRef}>
    {renderItem()}
  </div>
}