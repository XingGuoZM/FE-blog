import { useState, useEffect } from 'react';
import './index.css';

export default function Nav(props) {
  const { data, navItem, tabNav, index } = props;
  console.log('===', data, index);
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

  return <div className="tab-nav">
    {renderItem()}
  </div>
}