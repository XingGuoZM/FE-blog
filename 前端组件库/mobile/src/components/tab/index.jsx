import { useEffect, useState } from 'react';
import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import Panel from './Panel';
import Nav from './Nav';
import './index.css';
BScroll.use(Slide);

function Tab(props) {
  const { tabNav, tabPanel, data, tabChange } = props;
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let bs = new BScroll('.tab-panel', {
      scrollX: true,
      scrollY: false,
      slide: {
        autoplay: false,
        loop: false
      },
      momentum: false,
      bounce: false,
      probeType: 3
    });
    bs.on('slideWillChange', (page) => {
      // 即将要切换的页面
      const { pageX, pageY } = page;
      tabChange(pageX);
      setIndex(pageX);
    })
  });
  const tabData = data;
  function renderPanelItem(data, id) {
    const { panelItem } = tabPanel;
    return data.map(item => panelItem(item, id));
  }
  function renderNavItem(data) {
    const { navItem } = tabNav;
    return data.map(item => navItem && navItem(item));
  }
  return <div className='tab-wrap'>
    <Nav data={tabData} navItem={renderNavItem} tabNav={tabNav} index={index} />
    <div className='tab-panel'>
      <div className='tab-panel-content'>
        {tabData.map(item => <Panel key={item.id} data={item} panelItem={renderPanelItem} />)}
      </div>
    </div>
  </div>
}

export default Tab;