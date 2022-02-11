function Child(props){
  console.log('rerender:')
  const [result,setResult] = useState('')
  const { fetchData } = props;
   useEffect(() => {
     fetchData().then(result => {
       setResult(result);
     })
   },[fetchData])
  return (<>
     <div>query:{props.query}</div>
     <div>result:{result}</div>
   </>);
 }
 export function Parent(){
  const [query,setQuery] = useState('react');
  const fetchData = () => {
  const url = 'https://hn.algolia.com/api/v1/search?query=' + query
  return fetch(url).then(x => x.text())
  } 
  return (
     <div>
     <input onChange={e => setQuery(e.target.value)} value={query} />
     <Child fetchData={fetchData} query={query}/>
     </div>
   )
 }
 