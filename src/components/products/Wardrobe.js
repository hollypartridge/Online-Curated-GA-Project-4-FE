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
  
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getUserProfile()
        setProductsInWardrobe(res.data.productsInWardrobe)
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
    <>
      <h1>Wardrobe</h1>
      {productsInWardrobe.length <= 0 ? 
        <>
          <p>You dont have any products in your wardrobe.</p> 
          <Link to='/shop'><button>Explore</button></Link>
        </>
        :
        <div className="index-gallery">
          {isError && <Error />}
          {isLoading && <Loading />}
          {productsInWardrobe &&
          productsInWardrobe.map(product => (
            <>
              <div key={product.id}>
                <div className='gallery'>
                  <img src={product.product.image} alt={product.product.name} />
                  <p>{product.product.designer}</p>
                  <p>{product.product.name}</p>
                </div>
                <div>
                  <button
                    onClick={handleRemoveFromWardrobe}
                    id={product.id}
                  >
                Remove</button>
                </div>
              </div>
            </>
          ))}
        </div>}
    </>
  )
}

export default Wardrobe