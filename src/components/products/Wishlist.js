import React from 'react'
import { Link } from 'react-router-dom'
import Error from '../common/Error'
import Loading from '../common/Loading'

import { getUserProfile, removeFromWishlist } from '../lib/api'
import { getUserId } from '../lib/auth'

function Wishlist() {
  const [wishlistedProducts, setWishlistedProducts] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !isError && !wishlistedProducts
  const [productId, setProductId] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getUserProfile()
        setWishlistedProducts(res.data.wishlistedProducts)
        res.data.wishlistedProducts.filter(shoppingbag => {
          if (String(shoppingbag.owner) === getUserId()) {
            setProductId(shoppingbag.product.id)
          }
          return 
        })
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  const handleRemoveFromWishlist = async (e) => {
    try {
      await removeFromWishlist(productId, e)
      const res = await getUserProfile()
      setWishlistedProducts(res.data.wishlistedProducts)
    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <div className='wishlist'>
      <h1>Wishlist</h1>
      {wishlistedProducts.length <= 0 ? 
        <div className='no-products'>
          <p>You dont have any products in your wishlist.</p> 
          <Link to='/shop'><button>Continue Shopping</button></Link>
        </div>
        :
        <><div className="wishlist-gallery">
          {isError && <Error />}
          {isLoading && <Loading />}
          {wishlistedProducts &&
            wishlistedProducts.map(product => (
              <div key={product.id} className='gallery'>
                <div className='x-button'>
                  <button
                    onClick={handleRemoveFromWishlist}
                    id={product.id}
                  >
                  X</button>
                </div>
                <div>
                  <Link key={product.product.id} to={`/shop/${product.product.id}`}>
                    <img src={product.product.image} alt={product.product.name} />
                    <p>{product.product.designer}</p>
                    <p>{product.product.name}</p>
                    <p>£{product.product.price}</p>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className='keep-shop-wishlist'>
          <Link to='/shop'><button>Continue Shopping</button></Link>
        </div></>
      }
    </div>
  )
}

export default Wishlist