export const fetchData=(query)=>{
  return new Promise(resolve=>setTimeout(()=>resolve(query+''+query),1000));
}