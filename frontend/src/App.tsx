import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import Homepage from './Pages/Homepage'
import Testpage from './Pages/testpage';
import Quickview from './Pages/Quickview';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/test' element={<Testpage/>}/>
          <Route path='/quickview' element={<Quickview/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
