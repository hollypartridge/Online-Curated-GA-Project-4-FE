import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { addToWishlist, getSingleProduct, removeFromWishlist } from '../lib/api'
import Error from '../common/Error'
import Loading from '../common/Loading'
import { getUserId } from '../lib/auth'

function ProductShow() {
  const { productId } = useParams()
  const [product, setProduct] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !product && !isError
  const navigate = useNavigate()
  const [isWishlisted, setIsWishListed] = React.useState(false)
  const [wishlistId, setWishlistId] = React.useState(null)

  const addToWishListInfo = {
    product: productId,
    owner: getUserId(),
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingleProduct(productId)
        setProduct(res.data)
        const userWhoHaveWishlisted = res.data.wishlistedBy.map(wishlist => String(wishlist.owner.id))
        if (userWhoHaveWishlisted.includes(String(getUserId()))) {
          setIsWishListed(true)
        } 
        res.data.wishlistedBy.filter(wishlist => {
          if (String(wishlist.owner.id) === getUserId()) {
            setWishlistId(wishlist.id)
          }
          return 
        })
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [productId])

  console.log(wishlistId)

  const handleAddToWishList = async (e) => {
    e.preventDefault()
    try {
      const res = await addToWishlist(productId, addToWishListInfo)
      setProduct(res.data)
      navigate('/wishlist')
    } catch (err) {
      console.log(err)
    }
  }

  const handleRemoveFromWishlist = async (e) => {
    e.preventDefault()
    try {
      await removeFromWishlist(productId, wishlistId)
      setIsWishListed(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {isError && <Error />}
      {isLoading && <Loading />}
      {product &&
      <div>
        <img src={product.image} />
        <p>{product.name}</p>
        <p>{product.designer}</p>
        <p>{product.price}</p>
        <p>{product.description}</p>
        <button>Buy Now</button>
        {isWishlisted ? 
          <button onClick={handleRemoveFromWishlist}>Remove From Wishlist</button>
          :
          <button onClick={handleAddToWishList}>Add To Wishlist</button>
        }
        <button>Try Me</button>
      </div>}
    </>
  )
}

export default ProductShow