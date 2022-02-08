import React from 'react'
import { Link } from 'react-router-dom'
import { useDrop } from 'react-dnd'

import { getUserProfile, removeFromWardrobe } from '../../lib/api'
import Error from '../../common/Error'
import Loading from '../../common/Loading'
import { getUserId } from '../../lib/auth'
import WardrobeItem from './WardrobeItem'
import Popup from './Popup'

function Wardrobe() {
  const [productsInWardrobe, setProductsInWardrobe] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !isError && !productsInWardrobe
  const [productId, setProductId] = React.useState(null)
  const [username, setUsername] = React.useState(null)
  const [board, setBoard] = React.useState([])
  const [isPopupOpen, setIsPopupOpen] = React.useState(false)
  
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

  const [{ isOver }, drop] = useDrop(() =>({
    accept: 'product',
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const addImageToBoard = (id) => {
    const getData = async () => {
      try {
        const res = await getUserProfile()
        const wardrobeProducts = res.data.productsInWardrobe
        const wardrobeList = wardrobeProducts.filter((item) => id === item.id)
        setBoard((board) => [...board, wardrobeList[0]])
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }

  const handleRemoveFromWardrobe = async (e) => {
    try {
      await removeFromWardrobe(productId, e)
      const res = await getUserProfile()
      setProductsInWardrobe(res.data.productsInWardrobe)
    } catch (err) {
      setIsError(true)
    }
  }

  const handleStartAgain = () => {
    setBoard([])
  }

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen)
  }

  return (
    <>
      <div className='wardrobe-mobile'>
        <p id='spider-web'>🕸</p>
        <p>We&#39;re sorry, our wardrobe feature is only available on desktop.</p>
        <Link to='/shop'><button className='no-products-wardrobe-button'>Back To Shop</button></Link>
      </div>
      <div className='wardrobe-page'>
        {isPopupOpen && 
      <Popup 
        handleClose={togglePopup}
        startAgain={handleStartAgain}
      />}
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
            <WardrobeItem 
              key={product.id}
              id={product.id}
              remove={handleRemoveFromWardrobe}
              img={product.product.image}
              alt={product.product.alt}
              name={product.product.name}
            />
          ))}
              </div>}
          </div>
        </div>
        <div className='try-on-area' ref={drop} style={{ border: isOver && '1px solid black' }}>
          <div className='reset'>
            <button onClick={togglePopup}>How It Works</button>
          </div>
          <div 
            className='wardrobe-drop-zone'
          >
            {board.slice(0, 4).map(item => (
              <div key={item.id}>
                <img src={item.product.image} width='225px' />
              </div>
            ))}
          </div>
          <div className='reset'>
            {board.length > 0 && 
          <>
            <button onClick={handleStartAgain}>Start Again</button>
          </>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Wardrobe