import React from 'react'
import { useNavigate } from 'react-router-dom'

import { isAuthenticated, removeToken, removeUserId } from '../lib/auth'

function Nav() {
  const [isUserMenuOpen, setUserMenuOpen] = React.useState(false)
  const [isShoppingBagMenuOpen, setisShoppingBagMenuOpen] =
    React.useState(false)
  const [isWishListOpen, setisWishListOpen] = React.useState(false)
  const navigate = useNavigate()
  const isAuth = isAuthenticated()

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleShopClick = () => {
    navigate('/shop')
  }

  const handleWishlistClick = () => {
    if (isAuth) {
      navigate('/wishlist')
    } else {
      navigate('/useronly')
    }
    setisWishListOpen(false)
  }

  const handleShoppingBagClick = () => {
    if (isAuth) {
      navigate('/shoppingbag')
    } else {
      navigate('/useronly')
    }
    setisShoppingBagMenuOpen(false)
  }

  const handleWardrobeClick = () => {
    if (isAuth) {
      navigate('/wardrobe')
    } else {
      navigate('/useronly')
    }
    setisShoppingBagMenuOpen(false)
  }

  const handleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen)
    setisShoppingBagMenuOpen(false)
    setisWishListOpen(false)
  }

  const handleShoppingBagMenu = () => {
    setisShoppingBagMenuOpen(!isShoppingBagMenuOpen)
    setUserMenuOpen(false)
    setisWishListOpen(false)
  }

  const handleWishListMenu = () => {
    setisWishListOpen(!isWishListOpen)
    setisShoppingBagMenuOpen(false)
    setUserMenuOpen(false)
  }

  const handleSearchBarMenu = () => {
    setisWishListOpen(false)
    setisShoppingBagMenuOpen(false)
    setUserMenuOpen(false)
    navigate('/search')
  }

  const handleLogout = () => {
    setUserMenuOpen(false)
    removeToken()
    removeUserId()
    navigate('/')
  }

  const handleLogin = () => {
    setUserMenuOpen(false)
    navigate('/login')
  }

  return (
    <nav>
      <div className="primary-nav">
        <div className="nav-logo nav-primary-icon" onClick={handleHomeClick}>
          <p>Online Curated</p>
        </div>
        <div className="nav-shop nav-primary-icon" onClick={handleShopClick}>
          <p>Shop</p>
        </div>
        <div className="nav-about nav-primary-icon">
          <p>About</p>
        </div>
        <div className="nav-try-me nav-primary-icon" onClick={handleWardrobeClick}>
          <p>Wardrobe</p>
        </div>
        <div className="nav-icons nav-primary-icon">
          <button onClick={handleShoppingBagMenu}>💰</button>
          <button onClick={handleWishListMenu}>🍄</button>
          <button onClick={handleSearchBarMenu}>🦋</button>
          <button onClick={handleUserMenu}>🧚‍♀️</button>
        </div>
      </div>
      {isUserMenuOpen && (
        <div className="drop-down-nav">
          <div className='left-side-dropdown'>
          </div>
          {isAuth ? (
            <div
              className="nav-drop-down nav-secondary-icon"
              onClick={handleLogout}
            >
              <p>Logout</p>
            </div>
          ) : (
            <div
              className="nav-drop-down nav-secondary-icon"
              onClick={handleLogin}
            >
              <p>Login</p>
            </div>
          )}
        </div>
      )}
      {isShoppingBagMenuOpen && (
        <div className="drop-down-nav">
          <div className='left-side-dropdown'>
          </div>
          <div
            className="nav-drop-down nav-secondary-icon"
            onClick={handleShoppingBagClick}
          >
            <p>Shopping Bag</p>
          </div>
        </div>
      )}
      {isWishListOpen && (
        <div className="drop-down-nav">
          <div className='left-side-dropdown'>
          </div>
          <div
            className="nav-drop-down nav-secondary-icon"
            onClick={handleWishlistClick}
          >
            <p>Wishlist</p>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
