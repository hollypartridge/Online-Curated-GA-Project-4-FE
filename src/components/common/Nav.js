import React from 'react'
import { useNavigate } from 'react-router-dom'

function Nav() {
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleShopClick = () => {
    navigate('/shop')
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
          <p>💰</p>
          <p>🍄</p>
          <p>H</p>
          <p>H</p>
        </div>
      </div>
    </nav>
  )
}

export default Nav