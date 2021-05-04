import React,{useState,useEffect} from 'react';

export default (props)=>{
  const {showModal,closeModal}=props;
  useEffect(()=>{
    console.log(props)
    // showModal();
  },[])
  return <div>Modal1</div>
}