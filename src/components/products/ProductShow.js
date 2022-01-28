import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { 
  addToWishlist, 
  getSingleProduct, 
  removeFromWishlistShow, 
  addToShoppingBag, 
  addToWardrobe, 
  getAllProducts
} from '../lib/api'
import Error from '../common/Error'
import Loading from '../common/Loading'
import { getUserId, isAuthenticated } from '../lib/auth'

function ProductShow() {
  const { productId } = useParams()
  const [product, setProduct] = React.useState([])
  const [products, setProducts] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !product && !isError
  const navigate = useNavigate()
  const [isWishlisted, setIsWishListed] = React.useState(false)
  const [wishlistId, setWishlistId] = React.useState(null)
  const isAuth = isAuthenticated()
  const [isInShoppingBag, setIsInShoppingBag] = React.useState(false)
  const [isInWardrobe, setIsInWardrobe] = React.useState(false)
  const [designer, setDesigner] = React.useState(null)
  const [newDescription, setNewDescription] = React.useState(null)
  // const [isHovering, setIsHovering] = React.useState(false)
  // const [whatProductHovering, setWhatProductHovering] = React.useState(null)

  const productInteractionInfo = {
    product: productId,
    owner: getUserId(),
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingleProduct(productId)
        setProduct(res.data)
        setDesigner(res.data.designer)
        setNewDescription((res.data.description).split('  ').join('\n'))
        const resAllProducts = await getAllProducts()
        setProducts(resAllProducts.data)
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

  const featuredByDesigner = products.filter(product => {
    return product.designer === designer && String(product.id) !== productId
  })
  const featuredProducts = featuredByDesigner.sort(() => 0.5 - Math.random()).slice(0, 5)

  // const handleMouseEnter = (e) => {
  //   setIsHovering(true)
  //   setWhatProductHovering(e.target.id)
  // }

  // const handleMouseLeave = () => {
  //   setIsHovering(false)
  // }

  return (
    <>
      {isError && <Error />}
      {isLoading && <Loading />}
      {product &&
      <div>
        <p className='show-routes'>
          <Link to='/'> Home </Link>  <span className='route-symbol'>&gt;</span>
          <Link to='/shop'> Shop </Link> <span className='route-symbol'>&gt;</span> 
          <Link to={`/shop/${product.id}`}> {product.name} </Link>
        </p>
        <div className='show-page'>
          <div className='show-page-img'>
            <img src={product.image} />
          </div>
          <div className='show-page-info'>
            <div className='name-designer-show'>
              <p className='show-title'>{product.name}</p>
              <p>{product.designer}</p>
            </div>
            <p>£{product.price}</p>
            <p className='index-title'>Description</p>
            <p id='description'>{newDescription}</p>
            {isInShoppingBag ? 
              <button 
                onClick={handleAddedToBag}
                className='active-buttons shopping-bag-button added-to-buttons'
              >Added To Bag</button>
              :
              <button 
                onClick={handleAddToShoppingBag}
                className='shopping-bag-button not-clicked-button-show'
              >Buy Now</button>
            }
            {isInWardrobe ? 
              <button 
                onClick={handleAddedToWardrobe}
                className='active-buttons wishlist-wardrobe-buttons added-to-buttons'
              >Added To Wardrobe</button>
              :
              <button 
                onClick={handleAddToWardrobe}
                className='wishlist-wardrobe-buttons not-clicked-button-show'
              >Try Me</button>
            }
            {isWishlisted ? 
              <button 
                onClick={handleRemoveFromWishlist}
                className='active-buttons wishlist-wardrobe-buttons'
                id='remove-from-wishlist-button'
              >Remove From Wishlist</button>
              :
              <button 
                onClick={handleAddToWishList}
                className='wishlist-wardrobe-buttons not-clicked-button-show'
              >Add To Wishlist</button>
            }
          </div>
        </div>
      </div>}
      <p className='show-more'>More From {product.designer}... ✨</p>
      <div className="show-page-second-section">
        {products && 
      featuredProducts.map(product => (
        <div key={product.id} 
          className='show-featured-products'
        >
          <Link 
            key={product.id} 
            to={`/shop/${product.id}`}
          >
            <img src={product.image} id={product.id}/>
            <p>{product.name}</p>
          </Link>
        </div>
      ))}
      </div>
    </>
  )
}

export default ProductShow