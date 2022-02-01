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
    <div className='individual-products-wardrobe' style={{ border: isDragging ? '1px solid pink' : '0px' }}>
      <div>
        <button
          onClick={remove}
          id={id}
          className='remove-from-wardrobe'
        >
      X</button>
      </div>
      <div ref={drag}>
        <img src={img} alt={alt} />
        <p>{name}</p>
      </div>
    </div>
  )
}

export default WardrobeItem