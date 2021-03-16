const tabNav = {
  activeStyle: { color: 'red' },
  // navItem: (data) => {
  //   return <div key={data.id} style={{ width: '3rem' }}>{data.name}</div>
  // }
}
const tabPanel = {
  panelItem: (data, index) => {
    return <div key={index}
      style={{
        width: '7rem',
        height: '3.5rem',
        marginLeft: '0.25rem',
        marginTop: '0.25rem',
        backgroundColor: '#ddd'
      }}>
      {/* {data.name} */}
    </div>;
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
      }, {
        id: 2,
        name: 'panel2'
      }, {
        id: 3,
        name: 'panel3'
      }, {
        id: 4,
        name: 'panel4'
      }, {
        id: 5,
        name: 'panel5'
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
    console.log('scroll', index);
  }
}

export default tabProps;