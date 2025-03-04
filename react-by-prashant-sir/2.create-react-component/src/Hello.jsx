import React from 'react'
let myName = 'Tushar'
let fullName = () =>{
    return 'Tushar Yadav'
}
const Hello = () => {
  return (
    <div>
        Hello this is future speaking {myName}
        I am your master {fullName()}
    </div>
  )
}

export default Hello;