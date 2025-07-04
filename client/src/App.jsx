import { useState } from 'react'
import viteLogo from '/vite.svg'
import Signup from './pages/user/signup'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/user/login'
import Navbar from './components/Navbar'
import Main from './components/Main'
import AddProductForm from './components/AddProductForm'
import Cart from './components/Cart'
import Order from './components/Order'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={
        <>
        <Navbar/>
        <Main/>
        </>
        }/>
      <Route path='/add-product' element={
        <>
        <Navbar/>
        <AddProductForm/>
        </>
        }/>
      <Route path='/cart' element={
        <>
        <Navbar/>
        <Cart/>
        </>
        }/>
      <Route path='/order' element={
        <>
        <Navbar/>
        <Order/>
        </>
        }/>
    </Routes>
  )
}

export default App
