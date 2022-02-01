import { Link } from 'react-router-dom'

function Loading() {
  return (
    <div className="error-loading-page">
      <div className="error-loading-para">
        <p>Loading.｡.:*☆<br/>
        </p>
        <Link to='/'><button>Back to home</button></Link>
      </div>
    </div>
  )
}

export default Loading