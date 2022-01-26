import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserOnly from './components/auth/UserOnly'
import Home from './components/common/Home'
import Nav from './components/common/Nav'
import ProductIndex from './components/products/ProductIndex'
import ProductShow from './components/products/ProductShow'
import ShoppingBag from './components/products/ShoppingBag'
import Wishlist from './components/products/Wishlist'
import SecureRoute from './components/common/SecureRoute'
import SearchResults from './components/products/SearchResults'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductIndex />} />
        <Route path="/shop/:productId" element={<ProductShow />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchResults />} />
        <Route
          path="/wishlist"
          element={
            <SecureRoute>
              <Wishlist />
            </SecureRoute>
          }
        />
        <Route
          path="/shoppingbag"
          element={
            <SecureRoute>
              <ShoppingBag />
            </SecureRoute>
          }
        />
        <Route path="/useronly" element={<UserOnly />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
