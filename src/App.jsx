import Homepage from './pages/Homepages'
import { Routes, Route } from 'react-router'
import Orders from './pages/Orders'
import Checkout from './pages/Checkout'
import './App.css'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/orders.html" element={<Orders />}></Route>
        <Route path="/checkout.html" element={<Checkout />}></Route>
      </Routes>


    </>
  )
}

export default App
