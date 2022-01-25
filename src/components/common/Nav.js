import React from 'react'
import { useNavigate } from 'react-router-dom'

import { isAuthenticated, removeToken } from '../lib/auth'

function Nav() {
  const [isUserMenuOpen, setUserMenuOpen] = React.useState(false)
  const [isShoppingBagMenuOpen, setisShoppingBagMenuOpen] = React.useState(false)
  const [isWishListOpen, setisWishListOpen] = React.useState(false)
  const [isSearchBarOpen, setIsSearchBarOpen] = React.useState(false)
  const navigate = useNavigate()
  const isAuth = isAuthenticated()

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleShopClick = () => {
    navigate('/shop')
  }
  
  const handleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen)
    setisShoppingBagMenuOpen(false)
    setisWishListOpen(false)
    setIsSearchBarOpen(false)
  }
  
  const handleShoppingBagMenu = () => {
    setisShoppingBagMenuOpen(!isShoppingBagMenuOpen)
    setUserMenuOpen(false)
    setisWishListOpen(false)
    setIsSearchBarOpen(false)
  }

  const handleWishListMenu = () => {
    setisWishListOpen(!isWishListOpen)
    setisShoppingBagMenuOpen(false)
    setUserMenuOpen(false)
    setIsSearchBarOpen(false)
  }

  const handleSearchBarMenu = () => {
    setIsSearchBarOpen(!isSearchBarOpen)
    setisShoppingBagMenuOpen(false)
    setUserMenuOpen(false)
    setisWishListOpen(false)
  }

  const handleLogout = () => {
    setUserMenuOpen(false)
    removeToken()
    navigate('/')
  }

  const handleLogin = () => {
    setUserMenuOpen(false)
    navigate('/login')
  }

  return (
    <nav>
      <div className="primary-nav">
        <div 
          className="nav-logo nav-primary-icon"
          onClick={handleHomeClick}
        >
          <p>Online Curated</p>
        </div>
        <div 
          className="nav-shop nav-primary-icon"
          onClick={handleShopClick}
        >
          <p>Shop</p>
        </div>
        <div className="nav-about nav-primary-icon">
          <p>About</p>
        </div>
        <div className="nav-try-me nav-primary-icon">
          <p>Try Me</p>
        </div>
        <div className="nav-icons nav-primary-icon">
          <p onClick={handleShoppingBagMenu}>💰</p>
          <p onClick={handleWishListMenu}>🍄</p>
          <p onClick={handleSearchBarMenu}>H</p>
          <p onClick={handleUserMenu}>🧚‍♀️</p>
        </div>
      </div>
      {isUserMenuOpen &&
      <div className='drop-down-nav'>
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
      </div>}
      {isShoppingBagMenuOpen &&
      <div className='drop-down-nav'>
        <div className="nav-drop-down nav-secondary-icon">
          <p>Shopping Bag</p>
        </div>
      </div>}
      {isWishListOpen &&
      <div className='drop-down-nav'>
        <div className="nav-drop-down nav-secondary-icon">
          <p>Wishlist</p>
        </div>
      </div>}
      {isSearchBarOpen &&
      <div className='drop-down-nav'>
        <div className="nav-drop-down nav-secondary-icon">
          <p>Search</p>
        </div>
      </div>}
    </nav>
  )
}

export default Nav