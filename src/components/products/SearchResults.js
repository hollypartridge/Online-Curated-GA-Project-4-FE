import React from 'react'
import { Link } from 'react-router-dom'

import { getAllProducts } from '../lib/api'
import { getSearchValueLocalStorage } from '../lib/search'
import Error from '../common/Error'
import Loading from '../common/Loading'

function SearchResults() {
  const [products, setProducts] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !products && !isError

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getAllProducts()
        setProducts(res.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])


  const searchResults = () => {
    return products.filter(product => {
      if (getSearchValueLocalStorage()) {
        return product.designer.toLowerCase() === getSearchValueLocalStorage()
      }
    })
  }

  return (
    <div className="index-gallery">
      {isError && <Error />}
      {isLoading && <Loading />}
      {products &&
          searchResults().map(product => (
            <div key={product.id} className='gallery'>
              <Link key={product.id} to={`/shop/${product.id}`}>
                <img src={product.image} alt={product.name}/>
                <p>{product.designer}</p>
                <p>{product.name}</p>
                <p>£{product.price}</p>
              </Link>
            </div>
          ))}
    </div>
  )
}

export default SearchResults