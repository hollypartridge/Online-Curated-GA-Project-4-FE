import React from 'react'
import { Link } from 'react-router-dom'

import { getAllProducts } from '../lib/api'
import Error from '../common/Error'
import Loading from '../common/Loading'

function SearchResults() {
  const [products, setProducts] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !products && !isError
  const [keyword, setKeyword] = React.useState('')

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

  const handleSearch = (e) => {
    setKeyword(e.target.value)
  }

  const filteredProducts = products.filter(product => {
    if (keyword === '') {
      return product
    } else if (product.name.toLowerCase().includes(keyword.toLowerCase())) {
      return product
    }
  })

  return (
    <>
      <div>
        <input 
          placeholder='Search by product name...'
          onChange={handleSearch}
        />
      </div>
      <div className="index-gallery">
        {isError && <Error />}
        {isLoading && <Loading />}
        {products &&
        filteredProducts.map((product) => (
          <div key={product.id} className="gallery">
            <Link key={product.id} to={`/shop/${product.id}`}>
              <img src={product.image} alt={product.name} />
              <p>{product.designer}</p>
              <p>{product.name}</p>
              <p>£{product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default SearchResults
