import React from 'react'
let number = Math.random() * 10;

const Random = () => {
  return (
    <div>Random number is : {Math.round(number)}</div>
  )
}

export default Random;