import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './Components/About'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { useState } from 'react'
import Alert from './Components/Alert'

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      message,
      type,
    })

    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }
  return (
    <>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route
              exact
              path="/login"
              element={<Login showAlert={showAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
