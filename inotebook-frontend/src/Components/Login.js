import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })

    const json = await response.json()
    if (json.success) {
      // redirect
      localStorage.setItem('token', json.authToken)
      navigate('/')
      props.showAlert('Logged in Successfully', 'success')
    } else {
      props.showAlert('Invalid Credentials', 'danger')
    }
    console.log(json)
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="mt-5">
      <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
