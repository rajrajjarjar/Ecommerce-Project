import Homepage from './pages/Homepages'
import { Routes, Route } from 'react-router'
import Orders from './pages/Orders'
import Checkout from './pages/Checkout/Checkout'
import SimpleShopAuth from './pages/SimpleShopAuth'
import './App.css'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/login" element={<SimpleShopAuth />}></Route>

      </Routes>


    </>
  )
}

export default App
