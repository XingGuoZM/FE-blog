import BetterScroll from 'better-scroll'

let bs = new BetterScroll('.wrapper', {
  movable: true,
  zoom: true
});

export default function ScrollList() {
  return <section id='wrapper'>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
  </section>
}


