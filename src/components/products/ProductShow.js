import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { addToWishlist, getSingleProduct } from '../lib/api'
import Error from '../common/Error'
import Loading from '../common/Loading'
import { getUserId } from '../lib/auth'

function ProductShow() {
  const { productId } = useParams()
  const [product, setProduct] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !product && !isError
  const navigate = useNavigate()

  const addToWishListInfo = {
    product: productId,
    owner: getUserId(),
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getSingleProduct(productId)
        setProduct(res.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [productId])

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

  console.log(product)

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
        <button onClick={handleAddToWishList}>Add To Wishlist</button>
        <button>Try Me</button>
      </div>}
    </>
  )
}

export default ProductShow