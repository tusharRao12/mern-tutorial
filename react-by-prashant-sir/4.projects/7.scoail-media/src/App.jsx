import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Header />
        <Footer />
      </div>
    </div>
  );
}

export default App
