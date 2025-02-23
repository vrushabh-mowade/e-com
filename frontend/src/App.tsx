import { BrowserRouter, Route, Routes } from 'react-router';
import Homepage from './Pages/Homepage'
import {Testpage} from './Pages/testpage';
import ComponentCheck from './Pages/ComponentCheck';
import ProductPage from './Pages/ProductPage';
import NotFound from './Components/NotFound';
import { Signup } from './Pages/Signup';
import { Signin } from './Pages/Signin';
import CartPage from './Pages/CartPage';
import ShippingPage from './Pages/ShippingPage';
import PaymentPage from './Pages/PaymentPage';
import { OrderProvider } from './Components/UseOrdercontext';




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path='/product/:id' element={<ProductPage/>}/>
          <Route path='/cart/:userId' element={<CartPage/>}/>
          <Route
            path='/shipping'
            element={
              <OrderProvider>
                <ShippingPage/>
              </OrderProvider>
            }
          />
          <Route path='/checkout' element={<PaymentPage/>}/>
          
          <Route path='/test' element={<Testpage/>}/>
          {/* <Route path='/test/:userId' element={<CartPage/>}/> */}
          <Route path='/componentcheck' element={<ComponentCheck/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
