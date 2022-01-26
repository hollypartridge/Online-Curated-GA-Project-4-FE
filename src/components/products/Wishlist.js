import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Error from '../common/Error'
import Loading from '../common/Loading'

import { getUserProfile, addToShoppingBag, removeFromWishlist } from '../lib/api'
import { getUserId } from '../lib/auth'

function Wishlist() {
  const [wishlistedProducts, setWishlistedProducts] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !isError && !wishlistedProducts
  const [productId, setProductId] = React.useState(null)
  const navigate = useNavigate()

  const productInteractionInfo = {
    product: productId,
    owner: getUserId(),
  }

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

  const handleAddToBag = async (e) => {
    try {
      await removeFromWishlist(productId, e)
      await addToShoppingBag(productId, productInteractionInfo)
      navigate('/shoppingbag')
    } catch (err) {
      setIsError(true)
    }
  }

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
    <>
      <h1>Wishlist</h1>
      {wishlistedProducts.length <= 0 ? 
        <>
          <p>You dont have any products in your wishlist.</p> 
          <Link to='/shop'><button>Explore</button></Link>
        </>
        :
        <div className="index-gallery">
          {isError && <Error />}
          {isLoading && <Loading />}
          {wishlistedProducts &&
          wishlistedProducts.map(product => (
            <div key={product.id} className='gallery'>
              <Link key={product.product.id} to={`/shop/${product.product.id}`}>
                <img src={product.product.image} alt={product.product.name}/>
                <p>{product.product.designer}</p>
                <p>{product.product.name}</p>
                <p>£{product.product.price}</p>
              </Link>
              <button
                onClick={handleAddToBag}
                id={product.id}
              >
                Add To Bag</button>
              <button 
                onClick={handleRemoveFromWishlist}
                id={product.id}
              >
                Remove</button>
            </div>
          ))}
        </div>}
    </>
  )
}

export default Wishlist