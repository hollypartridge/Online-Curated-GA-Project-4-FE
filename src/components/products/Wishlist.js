import React from 'react'
import { Link } from 'react-router-dom'
import Error from '../common/Error'
import Loading from '../common/Loading'

import { getUserProfile } from '../lib/api'

function Wishlist() {
  const [wishlistedProducts, setWishlistedProducts] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !isError && !wishlistedProducts

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getUserProfile()
        setWishlistedProducts(res.data.wishlistedProducts)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

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
            </div>
          ))}
        </div>}
    </>
  )
}

export default Wishlist