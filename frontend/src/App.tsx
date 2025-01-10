import { BrowserRouter, Route, Routes } from 'react-router';
import Homepage from './Pages/Homepage'
import {Testpage} from './Pages/testpage';
import ComponentCheck from './Pages/ComponentCheck';
import ProductPage from './Pages/ProductPage';
import NotFound from './Components/NotFound';
import { Signup } from './Pages/Signup';
import { Signin } from './Pages/Signin';
import CartPage from './Pages/CartPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path='/test/:userId' element={<Testpage/>}/>
          <Route path='/componentcheck' element={<ComponentCheck/>}/>
          <Route path='/product/:id' element={<ProductPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
