const express = require('express')
const routeProducts = express.Router()
const{
    getAllProducts,
    getDetailProducts,
    insertProducts,
    updateProducts,
    updateProductsPatch,
    deleteProducts,
    getAllProductsCategory
} = require('../controllers/products')
const { authentication, authorizationAdmin, authorizationCashier } = require('../helpers/middleware/auth')
const { getAllProductsRedis } = require('../helpers/redis/products')
const singleUpload = require('../helpers/middleware/upload')

routeProducts
    .get('/products', authentication, getAllProductsRedis, getAllProducts)                // access for admin & cashier
    .get('/product/:id', authentication, getDetailProducts)                               // access for admin & cashier
    .post('/products', authentication, authorizationAdmin, singleUpload, insertProducts)  // access for admin
    .put('/products/:id', authentication, authorizationAdmin, singleUpload, updateProducts) // access for admin
    .patch('/products/:id', authentication, authorizationAdmin, singleUpload, updateProductsPatch)      // access for admin
    .delete('/products/:id', authentication, authorizationAdmin, deleteProducts)          // access for admin
    .get('/productsCategory', authentication, getAllProductsCategory)                     // access for admin & cashier

    
module.exports = routeProducts