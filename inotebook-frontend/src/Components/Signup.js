import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  })
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (credentials.password !== credentials.cpassword) {
      alert('password and confirm password do not match')
      return
    }
    const { name, email, password } = credentials
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const json = await response.json()
    if (json.success) {
      // redirect
      localStorage.setItem('token', json.authtoken)
      navigate('/')
      props.showAlert('Successfully Created Your Account', 'success')
    } else {
      props.showAlert('Invalid Credentials', 'danger')
    }
    console.log(json)
  }
  return (
    <div className="container mt-5">
      <h2>Signup in iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
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
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
