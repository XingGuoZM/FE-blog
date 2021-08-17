import { useEffect, useState } from 'react';
import { mockName, mockAge } from '../mock';
function MockPage() {
  const [name, setName] = useState();
  const [age, setAge] = useState('');
  const getName = async () => {
    const res = await mockName();
    setName(res?.name);
  }
  const getAge = async () => {
    const res = await mockAge();
    setAge(res?.age);
  }
  useEffect(() => {
    getName();
    getAge();
  }, [])
  return <div>
    {name && <div>{name}</div>}
    {''}
    {''}
  </div>
}
export default MockPage