
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../lib/api'
import { setToken, setUserId } from '../lib/auth'

function Login() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const [isError, setIsError] = React.useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await loginUser(formData)
      setToken(res.data.token)
      setUserId(res.data.id)
      navigate('/')
    } catch (err) {
      setIsError(true)
    }
  }

  return (
    <div className='form'>
      <div className='form-div'>
        <p className='show-title'>Login</p>
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
          {isError && 
          <p className='account-p'>Email or Password were incorrect</p> 
          }
          <div className='account-p'>
            <button>Sign In</button>
            <p>Dont have an account?</p>
            <Link to='/register'><p className='register'>Create an account</p></Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login