import { Navigate } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../lib/auth'

function SecureRoute({ children } ) {
  if (isAuthenticated()) {
    return children
  }
  removeToken()
  return <Navigate to='/useronly' />
}

export default SecureRoute