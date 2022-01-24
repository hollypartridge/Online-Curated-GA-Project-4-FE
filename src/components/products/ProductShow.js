import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../lib/api'

function ProductShow() {
  const { productId } = useParams()
  const [product, setProduct] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      const res = await getSingleProduct(productId)
      setProduct(res.data)
    }
    getData()
  }, [productId])

  return (
    <>
      <img src={product.image} />
      <p>{product.name}</p>
      <p>{product.designer}</p>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <button>Buy Now</button>
      <button>Add To Wishlist</button>
      <button>Try Me</button>
    </>
  )
}

export default ProductShow