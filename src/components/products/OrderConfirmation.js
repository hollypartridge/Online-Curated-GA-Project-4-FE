import { Link } from 'react-router-dom'

function OrderConfirmation() {
  return (
    <div className="order-confirm-page">
      <div className="order-para">
        <p>Your order is confirmed.｡.:*☆<br/>
        Keep an eye on your email for any updates 🦋
        </p>
        <Link to='/'><button>Back to home</button></Link>
      </div>
    </div>
  )
}

export default OrderConfirmation