import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/common/Home'
import Nav from './components/common/Nav'
import ProductIndex from './components/products/ProductIndex'
import ProductShow from './components/products/ProductShow'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/shop" element = {<ProductIndex />} />
        <Route path = "/shop/:productId" element = {<ProductShow />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
