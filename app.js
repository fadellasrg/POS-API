const express = require('express')
const bodyParser = require('body-parser')
const routeProducts = require('./src/routes/products')
const routeCategory = require('./src/routes/category')
const routeHistory = require('./src/routes/history')
const userRoute = require('./src/routes/users')

const { PORT } = require('./src/helpers/env')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const history = require('connect-history-api-fallback')

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(routeProducts)
app.use(routeCategory)
app.use(routeHistory)
app.use(userRoute)
// open route for public image
app.use('/images', express.static('./public/images'))

app.use(history({
    verbose: true
}))
app.use('/', express.static('dist'))
app.listen(PORT, () => {   
    console.log(`Server running on PORT ${PORT}`)
})      