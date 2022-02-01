import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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
import Wardrobe from './components/products/wardrobe/Wardrobe'
import About from './components/common/About'
import Checkout from './components/products/Checkout'
import OrderConfirmation from './components/products/OrderConfirmation'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
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
        <Route
          path="/wardrobe"
          element={
            <SecureRoute>
              <DndProvider backend={HTML5Backend}>
                <Wardrobe />
              </DndProvider>
            </SecureRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <SecureRoute>
              <Checkout />
            </SecureRoute>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <SecureRoute>
              <OrderConfirmation />
            </SecureRoute>
          }
        />
        <Route path="/useronly" element={<UserOnly />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
