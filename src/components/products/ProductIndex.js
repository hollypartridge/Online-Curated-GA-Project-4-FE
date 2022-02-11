import React from 'react'
import { Link } from 'react-router-dom'
import Error from '../common/Error'
import Loading from '../common/Loading'
import { getAllProducts } from '../lib/api'

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

  const filteredClothing = products.filter(product => {
    return product.type === selectedType || selectedType === 'All'
  })


  return (
    <div className="index-page">
      <div className="filter-left">
        <div 
          className='category'
          onClick={handleOpenClothingClick}
        >
          <p className='index-title'>Clothing ✨</p>
          {isClothingOpen &&
            <>
              <p className='index-options' onClick={handleTypeChangeClick}>Coats + Jackets</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Dresses</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Jeans</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Knitwear</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Shorts</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Skirts</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Sweatshirt</p>
              <p className='index-options' onClick={handleTypeChangeClick}>T-shirts</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Trackpants</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Trousers</p>
            </>
          }
        </div>
        <div 
          className='category'
          onClick={handleOpenAccessoriesClick}
        >
          <p className='index-title'>Accessories 🧸</p>
          {isAccessoriesgOpen &&
            <>
              <p className='index-options' onClick={handleTypeChangeClick}>Bags</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Gloves</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Hair</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Hats</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Jewellery</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Socks</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Tights</p>
            </>
          }
        </div>
        <div 
          className='category'
          onClick={handleOpenShoesClick}
        >
          <p className='index-title'>Shoes 🩰</p>
          {isShoesOpen &&
            <>
              <p className='index-options' onClick={handleTypeChangeClick}>Boots</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Flats</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Heels</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Trainers</p>
            </>
          }
        </div>
        <div 
          className='category'
          onClick={handleOpenBeautyClick}
        >
          <p className='index-title'>Beauty + Lifestyle 🕸</p>
          {isBeautyOpen &&
            <>
              <p className='index-options' onClick={handleTypeChangeClick}>Home</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Makeup</p>
              <p className='index-options' onClick={handleTypeChangeClick}>Skincare</p>
            </>
          }
        </div>
      </div>
      <div className="index-gallery">
        {isError && <Error />}
        {isLoading && <Loading />}
        {products &&
          filteredClothing.map(product => (
            <div key={product.id} className='gallery'>
              <Link key={product.id} to={`/shop/${product.id}`}>
                <img src={product.image} alt={product.name}/>
                <p>{product.name}</p>
                <p>{product.designer}</p>
                <p>£{product.price}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ProductIndex