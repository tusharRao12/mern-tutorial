import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../src/pages/Home';
import NotFound from '../src/pages/NotFound';
import { Toaster} from "@/components/ui/toaster";
function App() {

  return (
    <>
    <Toaster/>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
