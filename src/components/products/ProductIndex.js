import React from 'react'
import { Link } from 'react-router-dom'
import Error from '../common/Error'
import Loading from '../common/Loading'
import { getAllProducts } from '../lib/api'
import { getSearchValueLocalStorage } from '../lib/search'

function ProductIndex() {
  const [products, setProducts] = React.useState([])
  const [selectedType, setSelectedType] = React.useState('All')
  const [isClothingOpen, setIsClothingOpen] = React.useState(false)
  const [isAccessoriesgOpen, setIsAccessoriesOpen] = React.useState(false)
  const [isShoesOpen, setIsShoesOpen] = React.useState(false)
  const [isBeautyOpen, setIsBeautyOpen] = React.useState(false)
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

  const handleOpenClothingClick = () => {
    setIsClothingOpen(!isClothingOpen)
  }

  const handleOpenAccessoriesClick = () => {
    setIsAccessoriesOpen(!isAccessoriesgOpen)
  }

  const handleOpenShoesClick = () => {
    setIsShoesOpen(!isShoesOpen)
  }

  const handleOpenBeautyClick = () => {
    setIsBeautyOpen(!isBeautyOpen)
  }

  const handleTypeChangeClick = (e) => {
    setSelectedType(e.target.innerText)
  }

  const filteredClothing = () => {
    return products.filter(product => {
      if (getSearchValueLocalStorage()) {
        return product.designer.toLowerCase() === getSearchValueLocalStorage()
      }
      return product.type === selectedType || selectedType === 'All'
    })
  }

  return (
    <div className="index-page">
      <div className="filter-left">
        <div 
          className='category'
          onClick={handleOpenClothingClick}
        >
          <p>Clothing</p>
          {isClothingOpen &&
            <>
              <p onClick={handleTypeChangeClick}>Coats + Jackets</p>
              <p onClick={handleTypeChangeClick}>Dresses</p>
              <p onClick={handleTypeChangeClick}>Jeans</p>
              <p onClick={handleTypeChangeClick}>Knitwear</p>
              <p onClick={handleTypeChangeClick}>Shorts</p>
              <p onClick={handleTypeChangeClick}>Skirts</p>
              <p onClick={handleTypeChangeClick}>Sweatshirt</p>
              <p onClick={handleTypeChangeClick}>T-shirts</p>
              <p onClick={handleTypeChangeClick}>Trackpants</p>
              <p onClick={handleTypeChangeClick}>Trousers</p>
            </>
          }
        </div>
        <div 
          className='category'
          onClick={handleOpenAccessoriesClick}
        >
          <p>Accessories</p>
          {isAccessoriesgOpen &&
            <>
              <p onClick={handleTypeChangeClick}>Bags</p>
              <p onClick={handleTypeChangeClick}>Gloves</p>
              <p onClick={handleTypeChangeClick}>Hair</p>
              <p onClick={handleTypeChangeClick}>Hats</p>
              <p onClick={handleTypeChangeClick}>Jewellery</p>
              <p onClick={handleTypeChangeClick}>Socks</p>
              <p onClick={handleTypeChangeClick}>Sunglasses</p>
              <p onClick={handleTypeChangeClick}>Tights</p>
            </>
          }
        </div>
        <div 
          className='category'
          onClick={handleOpenShoesClick}
        >
          <p>Shoes</p>
          {isShoesOpen &&
            <>
              <p onClick={handleTypeChangeClick}>Boots</p>
              <p onClick={handleTypeChangeClick}>Flats</p>
              <p onClick={handleTypeChangeClick}>Heels</p>
              <p onClick={handleTypeChangeClick}>Trainers</p>
            </>
          }
        </div>
        <div 
          className='category'
          onClick={handleOpenBeautyClick}
        >
          <p>Beauty + Lifestyle</p>
          {isBeautyOpen &&
            <>
              <p onClick={handleTypeChangeClick}>Home</p>
              <p onClick={handleTypeChangeClick}>Makeup</p>
              <p onClick={handleTypeChangeClick}>Skincare</p>
            </>
          }
        </div>
      </div>
      <div className="index-gallery">
        {isError && <Error />}
        {isLoading && <Loading />}
        {products &&
          filteredClothing().map(product => (
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
    </div>
  )
}

export default ProductIndex