import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { 
  addToWishlist, 
  getSingleProduct, 
  removeFromWishlistShow, 
  addToShoppingBag, 
  addToWardrobe 
} from '../lib/api'
import Error from '../common/Error'
import Loading from '../common/Loading'
import { getUserId, isAuthenticated } from '../lib/auth'

function ProductShow() {
  const { productId } = useParams()
  const [product, setProduct] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !product && !isError
  const navigate = useNavigate()
  const [isWishlisted, setIsWishListed] = React.useState(false)
  const [wishlistId, setWishlistId] = React.useState(null)
  const isAuth = isAuthenticated()
  const [isInShoppingBag, setIsInShoppingBag] = React.useState(false)
  const [isInWardrobe, setIsInWardrobe] = React.useState(false)

  const productInteractionInfo = {
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
        const usersWhoHaveInShoppingBag = res.data.inShoppingBagOf.map(wishlist => String(wishlist.owner.id))
        if (usersWhoHaveInShoppingBag.includes(String(getUserId()))) {
          setIsInShoppingBag(true)
        } 
        const usersWhoHaveInWardrobe = res.data.inWardrobeOf.map(wishlist => String(wishlist.owner.id))
        if (usersWhoHaveInWardrobe.includes(String(getUserId()))) {
          setIsInWardrobe(true)
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

  const handleAddToWishList = async () => {
    try {
      if (isAuth) {
        const res = await addToWishlist(productId, productInteractionInfo)
        setProduct(res.data)
        navigate('/wishlist')
      } else {
        navigate('/useronly')
      }
    } catch (err) {
      setIsError(true)
    }
  }

  const handleRemoveFromWishlist = async () => {
    try {
      await removeFromWishlistShow(productId, wishlistId)
      setIsWishListed(false)
    } catch (err) {
      setIsError(true)
    }
  }

  const handleAddToShoppingBag = async () => {
    try {
      if (isAuth) {
        const res = await addToShoppingBag(productId, productInteractionInfo)
        setProduct(res.data)
        navigate('/shoppingbag')
      } else {
        navigate('/useronly')
      }
    } catch (err) {
      setIsError(true)
    }
  }

  const handleAddedToBag = () => {
    navigate('/shoppingbag')
  }

  const handleAddedToWardrobe = () => {
    navigate('/wardrobe')
  }

  const handleAddToWardrobe = async () => {
    try {
      if (isAuth) {
        const res = await addToWardrobe(productId, productInteractionInfo)
        setProduct(res.data)
        navigate('/wardrobe')
      } else {
        navigate('/useronly')
      }
    } catch (err) {
      setIsError(true)
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
        {isInShoppingBag ? 
          <button onClick={handleAddedToBag}>Added To Bag</button>
          :
          <button onClick={handleAddToShoppingBag}>Buy Now</button>
        }
        {isWishlisted ? 
          <button onClick={handleRemoveFromWishlist}>Remove From Wishlist</button>
          :
          <button onClick={handleAddToWishList}>Add To Wishlist</button>
        }
        {isInWardrobe ? 
          <button onClick={handleAddedToWardrobe}>Added To Wardrobe</button>
          :
          <button onClick={handleAddToWardrobe}>Try Me</button>
        }
      </div>}
    </>
  )
}

export default ProductShow