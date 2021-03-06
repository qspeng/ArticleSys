const express = require('express')
const config = require('./config')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')
const cors = require('cors')
const path = require('path')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

routes(app)

const mongoose = require('mongoose')
const User = require('./models/user')

mongoose.connect(config.DBURI)
let db = mongoose.connection
db.on('error', err => {
    console.log("connect failed!", err)
})
db.once('open', () => {
    console.log("connect success!")
})

app.listen(config.PORT, () => {
    console.log(`server is running on ${config.PORT}`)
})