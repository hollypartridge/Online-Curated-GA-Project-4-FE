import React from 'react'
import Error from '../common/Error'
import Loading from '../common/Loading'
import { getUserProfile } from '../lib/api'

function Checkout() {
  const [productsInShoppingBag, setProductsInShoppingBag] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !productsInShoppingBag && !isError
  const [totalPrice, setTotalPrice] = React.useState(null)
  const [shippingPrice, setShippingPrice] = React.useState(0)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getUserProfile()
        setProductsInShoppingBag(res.data.productsInShoppingBag)
        handleTotalPrice(res.data.productsInShoppingBag)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [])

  const handleTotalPrice = (shoppingBag) => {
    const onlyPrices = shoppingBag.map(product => {
      return product.product.price
    })
  
    const currentTotalPrice = onlyPrices.reduce((sum, amount) => {
      return sum + amount
    }, 0)
    setTotalPrice(currentTotalPrice)
  }

  const handleRadioExpressShipping = () => {
    setShippingPrice(8)
  }

  const handleRadioStandardShipping = () => {
    setShippingPrice(4)
  }

  return (
    <div className="checkout">
      <div className="checkout-details">
        <h1 className="border-bottom">Checkout</h1>
        <form>
          <h1 className="border-bottom checkout-title">Shipping Details</h1>
          <div className='form-type-input form-margin-checkout'>
            <div>
              <label htmlFor="name">Name</label><br/>
              <input  
                name="name"
                id="name"
              />
            </div>
            <div>
              <label htmlFor="address">Address</label><br/>
              <input 
                name="address"
                id="address"
              />
            </div>
          </div>
          <div className="form-type-input">
            <div className='form-margin-bottom-checkout'>
              <label htmlFor="postcode">Postcode</label><br/>
              <input 
                name="postcode"
                id="postcode"
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label><br/>
              <input 
                name="phone"
                id="phone"
              />
            </div>
          </div>
          <h1 className="border-bottom checkout-title">Shipping Method</h1>
          <div className='form-margin-checkout'>
            <input 
              name='shipping'
              type='radio' 
              id='1-2' 
              value='8' 
              onClick={handleRadioExpressShipping} 
            />
            <label htmlFor="1-2">£8 | 1 - 2 days | Express</label><br/>
            <input 
              name='shipping'
              type='radio' 
              id='3-4' 
              value='4' 
              onClick={handleRadioStandardShipping} 
            />
            <label htmlFor="3-4">£4 | 3 - 4 days | Standard</label><br/>
          </div>
        </form>
      </div>
      <div className="checkout-summary">
        <h1 className="border-bottom">Order Summary</h1>
        {isError && <Error />}
        {isLoading && <Loading />}
        {productsInShoppingBag && 
        productsInShoppingBag.map(product => (
          <div key={product.id} className='order-summary-products border-bottom'>
            <div>
              <img src={product.product.image} />
            </div>
            <div>
              <p>{product.product.name}</p>
            </div>
            <div>
              <p>£{product.product.price}</p>
            </div>
          </div>
        ))}
        <div className='price-list border-bottom'>
          <div className='checkout-prices'>
            <p>Subtotal</p>
            <p>£{totalPrice}</p>
          </div>
          <div className='checkout-prices'>
            <p>Shipping total</p>
            <p>£{shippingPrice}</p>
          </div>
          <div className='checkout-prices'>
            <p>Duties + Tax</p>
            <p>(included)</p>
          </div>
        </div>
        <div>
          <div className='checkout-prices'>
            <p>Subtotal</p>
            <p>£{totalPrice + shippingPrice}</p>
          </div>
          <div className='checkout-button'>
            <button>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout