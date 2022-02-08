import React from 'react'
import { useDrag } from 'react-dnd'

function WardrobeItem ({ id, remove, img, alt, name }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'product',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div className='individual-products-wardrobe'>
      <div className='remove-from-wardrobe'>
        <button
          onClick={remove}
          id={id}
        >
      x</button>
      </div>
      <div className='wardrobe-items' ref={drag}>
        <img src={img} alt={alt} />
        <p className={isDragging ? 'dragging-para' : null}>{name}</p>
      </div>
    </div>
  )
}

export default WardrobeItem