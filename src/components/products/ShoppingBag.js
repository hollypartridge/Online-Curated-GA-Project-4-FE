import React from 'react'
import { Link } from 'react-router-dom'

import { getUserProfile } from '../lib/api'
import Loading from '../common/Loading'
import Error from '../common/Error'

function ShoppingBag() {
  const [productsInShoppingBag, setProductsInShoppingBag] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !isError && !productsInShoppingBag

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getUserProfile()
        setProductsInShoppingBag(res.data.productsInShoppingBag)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  return (
    <>
      <h1>Shopping Bag</h1>
      {productsInShoppingBag.length <= 0 ? 
        <>
          <p>You dont have any products in your shopping bag.</p> 
          <Link to='/shop'><button>Explore</button></Link>
        </>
        :
        <>
          <div className="index-gallery">
            {isError && <Error />}
            {isLoading && <Loading />}
            {productsInShoppingBag &&
          productsInShoppingBag.map(product => (
            <div key={product.id} className='gallery'>
              <Link key={product.product.id} to={`/shop/${product.product.id}`}>
                <img src={product.product.image} alt={product.product.name}/>
                <p>{product.product.designer}</p>
                <p>{product.product.name}</p>
                <p>£{product.product.price}</p>
              </Link>
              <button>Move To WishList</button>
              <button>Remove</button>
            </div>
          ))}
          </div>
          <div>
            <button>Checkout</button>
          </div>
        </>}
    </>
  )
}

export default ShoppingBag