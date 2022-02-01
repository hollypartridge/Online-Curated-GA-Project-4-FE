import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className="error-loading-page">
      <div className="error-loading-para">
        <p>Oops something went wrong.｡.:*☆<br/>
        </p>
        <Link to='/'><button>Back to home</button></Link>
      </div>
    </div>
  )
}

export default Error