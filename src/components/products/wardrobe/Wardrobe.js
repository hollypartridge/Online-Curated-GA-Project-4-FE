import React from 'react'
import { Link } from 'react-router-dom'
import { useDrop } from 'react-dnd'

import { getUserProfile, removeFromWardrobe } from '../../lib/api'
import Error from '../../common/Error'
import Loading from '../../common/Loading'
import { getUserId } from '../../lib/auth'
import WardrobeItem from './WardrobeItem'

function Wardrobe() {
  const [productsInWardrobe, setProductsInWardrobe] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !isError && !productsInWardrobe
  const [productId, setProductId] = React.useState(null)
  const [username, setUsername] = React.useState(null)
  const [board, setBoard] = React.useState([])
  
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

  console.log(board)

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
      <div className='try-on-area'>
        <div className='wardrobe-top-drops'>
          <div 
            className='wardrobe-tops wardrobe-drop-zone'
            style={{ border: isOver && '5px solid pink' }}
            ref={drop}
          >
            {board.map(item => (
              <div key={item.id}>
                <img src={item.product.image} width='100%'/>
              </div>
            ))}
          </div>
          <div className='wardrobe-accessories wardrobe-drop-zone'>
          </div>
        </div>
        <div className='wardrobe-bottom-drops'>
          <div className='wardrobe-bottoms wardrobe-drop-zone'>
          </div>
          <div className='wardrobe-shoes wardrobe-drop-zone'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wardrobe