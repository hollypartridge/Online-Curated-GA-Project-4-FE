import React from 'react'
import { Link } from 'react-router-dom'

import { getUserProfile, removeFromWardrobe } from '../lib/api'
import Error from '../common/Error'
import Loading from '../common/Loading'
import { getUserId } from '../lib/auth'

function Wardrobe() {
  const [productsInWardrobe, setProductsInWardrobe] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !isError && !productsInWardrobe
  const [productId, setProductId] = React.useState(null)
  const [username, setUsername] = React.useState(null)
  
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getUserProfile()
        setProductsInWardrobe(res.data.productsInWardrobe)
        setUsername(res.data.username)
        res.data.productsInWardrobe.filter(wardrobe => {
          if (String(wardrobe.owner) === getUserId()) {
            setProductId(wardrobe.product.id)
          }
          return 
        })
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  const handleRemoveFromWardrobe = async (e) => {
    try {
      await removeFromWardrobe(productId, e)
      const res = await getUserProfile()
      setProductsInWardrobe(res.data.productsInWardrobe)
    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <div className='wardrobe-page'>
      <div className='finder'>
        <div className='user-display'>
          <p>{username}</p>
        </div>
        <div className='finder-gallery'>
          {productsInWardrobe.length <= 0 ? 
            <div id='no-products-wardrobe'>
              <div>
                <p>You dont have any products in your wardrobe.</p> 
                <Link to='/shop'><button className='no-products-wardrobe-button'>Explore</button></Link>
              </div>
            </div>
            :
            <div className='finder-gallery-with-products'>
              {isError && <Error />}
              {isLoading && <Loading />}
              {productsInWardrobe &&
          productsInWardrobe.map(product => (
            <div key={product.id}>
              <div className='individual-products-wardrobe'>
                <div>
                  <button
                    onClick={handleRemoveFromWardrobe}
                    id={product.id}
                    className='remove-from-wardrobe'
                  >
                X</button>
                </div>
                <div>
                  <img src={product.product.image} alt={product.product.name} />
                  <p>{product.product.name}</p>
                </div>
              </div>
            </div>
          ))}
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Wardrobe