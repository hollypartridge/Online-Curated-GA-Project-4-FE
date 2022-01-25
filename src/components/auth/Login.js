
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../lib/api'
import { setToken } from '../lib/auth'

function Login() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await loginUser(formData)
      setToken(res.data.token)
      navigate('/')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <div>
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email"></label>
          <input 
            placeholder="Email" 
            name="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input 
            placeholder="Password" 
            name="password"
            id="password"
            type="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button>Sign In</button>
          <Link to='/register'><p>Create an account</p></Link>
        </div>
      </form>
    </div>
  )
}

export default Login