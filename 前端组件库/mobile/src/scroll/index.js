import {useEffect} from 'react';
import BetterScroll from 'better-scroll'
import './index.css';


export default function ScrollList() {

  useEffect(()=>{
    
    let bs = new BetterScroll('.wrapper', {
      movable: true,
      zoom: true
    });
    bs.on('scroll',()=>{
      console.log('scroll');
    })
  })

  return <section className='wrapper'>
    <div className='content'>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>10</div>
      <div>11</div>
      <div>12</div>
      <div>13</div>
      <div>14</div>
      <div>15</div>
      <div>16</div>
      <div>17</div>
      <div>18</div>
      <div>19</div>
      <div>20</div>
    </div>
  </section>
}


