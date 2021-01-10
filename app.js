require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const routeProducts = require('./src/routes/products')
const routeCategory = require('./src/routes/category')
const routeHistory = require('./src/routes/history')

const app = express()
const cors = require('cors') 

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(routeProducts)
app.use(routeCategory)
app.use(routeHistory)

app.listen(process.env.PORT, () => {   
    console.log(`Server running on PORT ${process.env.PORT}`)
})      