import { useEffect, useState } from 'react';
import './index.css';

export default function Panel(props) {
  return <section className='tab-panel-item'>{props.index}</section>

}