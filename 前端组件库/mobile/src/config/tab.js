const tabNav = {
  activeStyle: { color: 'red' },
  // navItem: (data) => {
  //   return <div key={data.id} style={{ width: '3rem' }}>{data.name}</div>
  // }
}
const tabPanel = {
  panelItem: (data, index) => {
    return <div key={index}>{data.name}</div>;
  },
}
const tabProps = {
  data: [
    {
      id: 1,
      name: 'tab1',
      list: [{
        id: 1,
        name: 'panel1'
      }]
    },
    {
      id: 2,
      name: 'tab2',
      list: [{
        id: 1,
        name: 'panel2'
      }]
    }
  ],
  tabNav,
  tabPanel,
  tabChange: (index) => {
    console.log(index);
  }
}

export default tabProps;