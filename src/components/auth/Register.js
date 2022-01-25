import React from 'react'
import { useNavigate } from 'react-router'

import { registerUser } from '../lib/api'

function Register() {
  const [formData, setFormData] = React.useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await registerUser(formData)
      navigate('/')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <div>
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
        </div>
        <div>
          <label htmlFor="username"></label>
          <input 
            placeholder="Username" 
            name="username"
            id="username"
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
          <label htmlFor="passwordConfirmation"></label>
          <input 
            placeholder="Confirm Password" 
            name="passwordConfirmation"
            id="passwordConfirmation"
            type="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button>Create</button>
        </div>
      </form>
    </div>
  )
}

export default Register