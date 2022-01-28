import React from 'react'
import { Link } from 'react-router-dom'

import { getUserProfile, removeFromShoppingBag } from '../lib/api'
import Loading from '../common/Loading'
import Error from '../common/Error'
import { getUserId } from '../lib/auth'

function ShoppingBag() {
  const [productsInShoppingBag, setProductsInShoppingBag] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !isError && !productsInShoppingBag
  const [productId, setProductId] = React.useState(null)
  const [totalPrice, setTotalPrice] = React.useState(null)

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

  return (
    <div className='shopping-bag-page'>
      <div>
        <h1>Shopping Bag</h1>
      </div>
      {productsInShoppingBag.length <= 0 ? 
        <div className='no-products'>
          <p>You dont have any products in your shopping bag.</p> 
          <Link to='/shop'><button>Continue Shopping</button></Link>
        </div>
        :
        <>
          <div className="shopping-bag-gallery">
            {isError && <Error />}
            {isLoading && <Loading />}
            {productsInShoppingBag &&
          productsInShoppingBag.map(product => (
            <div key={product.id} className='shopping-bag-gallery-individual'>
              <Link to={`/shop/${product.product.id}`}>
                <div className='product-info-shopping-bag'>
                  <img src={product.product.image} alt={product.product.name}/>
                  <p>{product.product.designer}</p>
                  <p>{product.product.name}</p>
                  <p>£{product.product.price}</p>
                </div>
              </Link>
              <button 
                onClick={handleRemoveFromShoppingBag}
                id={product.id}
              >
                Remove</button>
            </div>
          ))}
            <div className='checkout-section'>
              <p className='total-price'>Total Price: £{totalPrice}</p>
              <Link to='/checkout'><button>Checkout</button></Link>
              <Link to='/shop'><button>Continue Shopping</button></Link>
            </div>
          </div>
        </>}
    </div>
  )
}

export default ShoppingBag