const express = require('express')
const cors = require('cors')
const connectDB = require('./src/db')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

connectDB();
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})