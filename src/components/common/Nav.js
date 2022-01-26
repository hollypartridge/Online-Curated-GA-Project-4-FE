import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

import { isAuthenticated, removeToken, removeUserId } from '../lib/auth';
// import { setSearchValueLocalStorage } from '../lib/search';

function Nav() {
  const [isUserMenuOpen, setUserMenuOpen] = React.useState(false);
  const [isShoppingBagMenuOpen, setisShoppingBagMenuOpen] =
    React.useState(false);
  const [isWishListOpen, setisWishListOpen] = React.useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = React.useState(false);
  const navigate = useNavigate();
  const isAuth = isAuthenticated();
  const [searchValue, setSearchValue] = React.useState('');

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleShopClick = () => {
    navigate('/shop');
  };

  const handleWishlistClick = () => {
    if (isAuth) {
      navigate('/wishlist');
    } else {
      navigate('/useronly');
    }
    setisWishListOpen(false);
  };

  const handleShoppingBagClick = () => {
    if (isAuth) {
      navigate('/shoppingbag');
    } else {
      navigate('/useronly');
    }
    setisShoppingBagMenuOpen(false);
  };

  const handleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
    setisShoppingBagMenuOpen(false);
    setisWishListOpen(false);
    setIsSearchBarOpen(false);
  };

  const handleShoppingBagMenu = () => {
    setisShoppingBagMenuOpen(!isShoppingBagMenuOpen);
    setUserMenuOpen(false);
    setisWishListOpen(false);
    setIsSearchBarOpen(false);
  };

  const handleWishListMenu = () => {
    setisWishListOpen(!isWishListOpen);
    setisShoppingBagMenuOpen(false);
    setUserMenuOpen(false);
    setIsSearchBarOpen(false);
  };

  const handleSearchBarMenu = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
    setisShoppingBagMenuOpen(false);
    setUserMenuOpen(false);
    setisWishListOpen(false);
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    removeToken();
    removeUserId();
    navigate('/');
  };

  const handleLogin = () => {
    setUserMenuOpen(false);
    navigate('/login');
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      // setSearchValueLocalStorage(searchValue)
      setIsSearchBarOpen(false);
      navigate({
        pathname: '/search',
        search: `?${createSearchParams({
          search: searchValue,
        })}`,
      });
    }
  };

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
      {isUserMenuOpen && (
        <div className="drop-down-nav">
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
          <div
            className="nav-drop-down nav-secondary-icon"
            onClick={handleWishlistClick}
          >
            <p>Wishlist</p>
          </div>
        </div>
      )}
      {isSearchBarOpen && (
        <div className="drop-down-nav">
          <div className="nav-drop-down nav-secondary-icon">
            <input
              type="search"
              placeholder="Search by designer..."
              onChange={handleSearch}
              onKeyPress={handleSubmit}
            />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
