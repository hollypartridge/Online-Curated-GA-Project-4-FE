
import React from 'react'
import { Link } from 'react-router-dom'

import { getUserProfile } from '../lib/api'

function Wishlist() {
  const [wishlistedProducts, setWishlistedProducts] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getUserProfile()
        setWishlistedProducts(res.data.wishlistedProducts)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  console.log(wishlistedProducts)

  return (
    <>
      <h1>Wishlist</h1>
      <div className="index-gallery">
        {wishlistedProducts ? (
          wishlistedProducts.map(product => (
            <div key={product.id} className='gallery'>
              <Link key={product.product.id} to={`/shop/${product.product.id}`}>
                <img src={product.product.image} alt={product.product.name}/>
                <p>{product.product.designer}</p>
                <p>{product.product.name}</p>
                <p>£{product.product.price}</p>
              </Link>
            </div>
          ))) : (
          <p>Laoding...</p>
        )}
      </div>
    </>
  )
}

export default Wishlist