import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Preview from './pages/Preview'


function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
         <Route index element={<Home />} /> 
         <Route path='upload' element={<Preview />} />
    </Routes>
    </BrowserRouter> 
  )
}

export default App
