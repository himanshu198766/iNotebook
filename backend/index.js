const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
connectToMongo()
app.get('/', (req, res) => {
  console.log('called me')
  res.send('Hello World!')
})

app.use(cors())

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

// We use this to access req.body in our routes
app.use(express.json())

// // Avaialable routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
