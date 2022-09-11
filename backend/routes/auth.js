const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')
const JWT_SECRET = 'HarryIsAGoodBoy'

// Create user using POST no login is required on "api/auth/createuser"
router.post(
  '/createuser',
  [
    body('name', 'Enter a valid name of atleast 3 character').isLength({
      min: 3,
    }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 length').isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors return errors, Bad request
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Check whether with the email already exist
    try {
      let user = await User.findOne({ email: req.body.email })

      if (user) {
        return res
          .status(400)
          .json({ error: 'Sorry user with this email already exist' })
      }

      // hashing the password
      const salt = await bcrypt.genSalt(10)
      const secPass = await bcrypt.hash(req.body.password, salt)
      // Creating and storing password in db
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })

      const data = {
        user: {
          id: user.id,
        },
      }

      const authToken = jwt.sign(data, JWT_SECRET)

      res.json(authToken)
    } catch (error) {
      console.log(error)
      res.status(500).send('Some error occurred')
    }
  },
)

// authenticate user using POST no login is required on "api/auth/createuser"

router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })
      if (!user) {
        res.status(500).json({ error: 'Please enter valid credentials' })
      }

      const passwordCompare = await bcrypt.compare(password, user.password)

      if (!passwordCompare) {
        return res.status(500).json({ error: 'Please enter valid credentials' })
      }

      const data = {
        user: {
          id: user.id,
        },
      }

      const authToken = jwt.sign(data, JWT_SECRET)

      res.json(authToken)
    } catch (error) {
      console.log(error)
      res.status(500).send('Internal Server error')
    }
  },
)

// get user login details using POST "api/auth/getuser" Login Required

router.post('/getuser', fetchUser, async (req, res) => {
  try {
    let userId = req.user.id
    const user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server error')
  }
})

module.exports = router
