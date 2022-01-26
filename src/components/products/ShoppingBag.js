import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { addToWishlist, getUserProfile, removeFromShoppingBag } from '../lib/api'
import Loading from '../common/Loading'
import Error from '../common/Error'
import { getUserId, isAuthenticated } from '../lib/auth'

function ShoppingBag() {
  const [productsInShoppingBag, setProductsInShoppingBag] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !isError && !productsInShoppingBag
  const [productId, setProductId] = React.useState(null)
  const isAuth = isAuthenticated()
  const navigate = useNavigate()
  const [totalPrice, setTotalPrice] = React.useState(null)

  const productInteractionInfo = {
    product: productId,
    owner: getUserId(),
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getUserProfile()
        setProductsInShoppingBag(res.data.productsInShoppingBag)
        res.data.productsInShoppingBag.filter(shoppingbag => {
          if (String(shoppingbag.owner) === getUserId()) {
            setProductId(shoppingbag.product.id)
          }
          return 
        })
        handleTotalPrice(res.data.productsInShoppingBag)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  const handleTotalPrice = (shoppingBag) => {
    const onlyPrices = shoppingBag.map(product => {
      return product.product.price
    })
  
    const currentTotalPrice = onlyPrices.reduce((sum, amount) => {
      return sum + amount
    }, 0)
    setTotalPrice(currentTotalPrice)
  }

  const handleRemoveFromShoppingBag = async (e) => {
    try {
      await removeFromShoppingBag(productId, e)
      const res = await getUserProfile()
      setProductsInShoppingBag(res.data.productsInShoppingBag)
      handleTotalPrice(res.data.productsInShoppingBag)
    } catch (err) {
      setIsError(true)
    }
  }

  const handleMoveToWishList = async (e) => {
    try {
      if (isAuth) {
        await removeFromShoppingBag(productId, e)
        await addToWishlist(productId, productInteractionInfo)
        navigate('/wishlist')
      } else {
        navigate('/login')
      }
    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <>
      <h1>Shopping Bag</h1>
      {productsInShoppingBag.length <= 0 ? 
        <>
          <p>You dont have any products in your shopping bag.</p> 
          <Link to='/shop'><button>Explore</button></Link>
        </>
        :
        <>
          <div className="index-gallery">
            {isError && <Error />}
            {isLoading && <Loading />}
            {productsInShoppingBag &&
          productsInShoppingBag.map(product => (
            <div key={product.id} className='gallery'>
              <Link key={product.product.id} to={`/shop/${product.product.id}`}>
                <img src={product.product.image} alt={product.product.name}/>
                <p>{product.product.designer}</p>
                <p>{product.product.name}</p>
                <p>£{product.product.price}</p>
              </Link>
              <button
                onClick={handleMoveToWishList}
                id={product.id}
              >
                Move To WishList</button>
              <button 
                onClick={handleRemoveFromShoppingBag}
                id={product.id}
              >
                Remove</button>
            </div>
          ))}
          </div>
          <div>
            <p>Total Price: £{totalPrice}</p>
            <button>Checkout</button>
          </div>
        </>}
    </>
  )
}

export default ShoppingBag