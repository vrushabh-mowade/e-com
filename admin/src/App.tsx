import { BrowserRouter, Route, Routes } from 'react-router';
import Dashboard from './Pages/Dashboard';
import { AddProduct } from './Pages/AddProduct';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
