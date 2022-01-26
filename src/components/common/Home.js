import React from 'react'

import { getAllProducts } from '../lib/api'
import Error from '../common/Error'
import Loading from '../common/Loading'

function Home() {
  const [isChangingNewIn, setIsChangingNewIn] = React.useState(true)
  const [products, setProducts] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !isError && !products
  const [isHovering, setIsHovering] = React.useState(false)

  const handleClick = () => {
    setIsChangingNewIn(!isChangingNewIn)
  }

  const handleMouseEnter = (e) => {
    setIsHovering(true)
    console.log(e.target.id)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  console.log(isHovering)

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

  const featuredProducts = () => {
    return products.filter(product => {
      if (product.featuredProduct) {
        return product
      }
    })
  }

  return (
    <>
      <div className="home-page-first-section">
        <div className="home-page-split-left">
          <img src="https://i.imgur.com/Q6Py7E4.jpg" />
        </div>
        <div className="home-page-split-right">
          {isChangingNewIn ? (
            <>
              <p>Ashley Williams</p>
              <img id="right-img" src="https://i.imgur.com/HdSlTC9.jpg" />
            </>
          ) : (
            <>
              <p>Miaou</p>
              <img id="right-img" src="https://i.imgur.com/cC2eIsp.jpg" />
            </>
          )}
          <p onClick={handleClick}>Click Me 🦋</p>
        </div>
      </div>
      <div className='home-page-second-section'>
        {isError && <Error />}
        {isLoading && <Loading />}
        {products && 
        featuredProducts().map(product => (
          <div key={product.id} 
            className='featured-products'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={product.image} id={product.id}/>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home