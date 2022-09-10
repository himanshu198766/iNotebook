const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 3000

connectToMongo()
app.get('/', (req, res) => {
  console.log('called me')
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// We use this to access req.body in our routes
app.use(express.json())

// // Avaialable routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
