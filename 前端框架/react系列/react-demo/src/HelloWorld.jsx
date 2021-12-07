import React, { useEffect } from 'react';

export default function HelloWorld() {
  useEffect(() => {
    console.log('hello')
  }, [])
  return <div>hello world</div>
}