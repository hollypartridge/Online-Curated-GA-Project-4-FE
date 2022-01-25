import React from 'react'
import { useParams } from 'react-router-dom'

import { getSingleProduct } from '../lib/api'
import Error from '../common/Error'
import Loading from '../common/Loading'

function ProductShow() {
  const { productId } = useParams()
  const [product, setProduct] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !product && !isError

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
        <button>Add To Wishlist</button>
        <button>Try Me</button>
      </div>}
    </>
  )
}

export default ProductShow