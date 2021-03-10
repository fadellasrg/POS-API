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
    .get('/api/products', authentication, getAllProductsRedis, getAllProducts)                // access for admin & cashier
    .get('/api/product/:id', authentication, getDetailProducts)                               // access for admin & cashier
    .post('/api/products', authentication, authorizationAdmin, singleUpload, insertProducts)  // access for admin
    .put('/api/products/:id', authentication, authorizationAdmin, singleUpload, updateProducts) // access for admin
    .patch('/api/products/:id', authentication, authorizationAdmin, singleUpload, updateProductsPatch)      // access for admin
    .delete('/api/products/:id', authentication, authorizationAdmin, deleteProducts)          // access for admin
    .get('/api/productsCategory', authentication, getAllProductsCategory)                     // access for admin & cashier

    
module.exports = routeProducts