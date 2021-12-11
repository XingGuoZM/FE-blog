import {useEffect,useState} from 'react';

function A({msg,onClick}){

return <div onClick={onClick}>{msg}</div>
}
export default A;