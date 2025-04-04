import axios from 'axios'
import './App.css'

function App() {

  const apiCall = () =>{
    axios.get("http://localhost:8080/")
    .then((data)=>{
      console.log(data);
    })
  }

  return (
    <>
      <div className="app">
        <button onClick={apiCall}>Make Api Call</button>
      </div>
    </>
  )
}

export default App
