const express = require('express')
const routeProducts = express.Router()
const{
    getAllProducts,
    getDetailProducts,
    insertProducts,
    updateProducts,
    updateProductsPatch,
    deleteProducts
} = require('../controllers/products')

routeProducts
    .get('/products', getAllProducts)
    .get('/product/:id', getDetailProducts)
    .post('/products', insertProducts)
    .put('/products/:id', updateProducts)
    .patch('/products/:id', updateProductsPatch)
    .delete('/products/:id', deleteProducts)

    
module.exports = routeProducts