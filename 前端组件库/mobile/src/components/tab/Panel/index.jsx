import { useEffect, useState } from 'react';
import './index.css';

export default function Panel(props) {
  const { data: { id, list }, panelItem } = props;
  return <section className='tab-panel-item' key={id}>{panelItem(list)}</section>
}