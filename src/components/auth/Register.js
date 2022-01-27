import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { registerUser } from '../lib/api'

const initialState = {
  email: '',
  username: '',
  password: '',
  passwordConfirmation: '',
}

function Register() {
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await registerUser(formData)
      navigate('/login')
    } catch (err) {
      setFormErrors(err.response.data)
    }
  }

  return (
    <div className='form'>
      <div className='register-div'>
        <p>Create Account</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email"></label>
            <input 
              placeholder="Email" 
              name="email"
              id="email"
              onChange={handleChange}
            />
            {formErrors.email && <p className='error'>{formErrors.email}</p>}
          </div>
          <div>
            <label htmlFor="username"></label>
            <input 
              placeholder="Username" 
              name="username"
              id="username"
              onChange={handleChange}
            />
            {formErrors.username && <p className='error'>{formErrors.username}</p>}
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
            {formErrors.password && <p className='error'>{formErrors.password}</p>}
          </div>
          <div>
            <label htmlFor="passwordConfirmation"></label>
            <input 
              placeholder="Confirm Password" 
              name="passwordConfirmation"
              id="passwordConfirmation"
              type="password"
              onChange={handleChange}
            />
            {formErrors.passwordConfirmation && <p className='error'>{formErrors.passwordConfirmation}</p>}
            {formErrors.detail && <p className='error'>{formErrors.detail}</p>}
          </div>
          <div className='account-p'>
            <button>Create</button>
            <p>Already have an account?</p>
            <Link to='/login'><p className='register'>Login here</p></Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register