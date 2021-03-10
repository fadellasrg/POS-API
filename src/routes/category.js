const express = require('express')
const routeCategory = express.Router()
const{
    getAllCategory,
    getDetailCategory,
    insertCategory,
    updateCategory,
    updateCategoryPatch,
    deleteCategory
} = require('../controllers/category')
const { authentication, authorizationAdmin, authorizationCashier } = require('../helpers/middleware/auth')

routeCategory
    .get('/api/category', authentication, getAllCategory)                                 // access for admin & cashier
    .get('/api/detailCategory/:id', authentication, getDetailCategory)                    // access for admin & cashier
    .post('/api/category', authentication, authorizationAdmin, insertCategory)            // access for admin
    .put('/api/category/:id', authentication, authorizationAdmin, updateCategory)         // access for admin
    .patch('/api/category/:id', authentication, authorizationAdmin, updateCategoryPatch)  // access for admin
    .delete('/api/category/:id', authentication, authorizationAdmin, deleteCategory)      // access for admin

    
module.exports = routeCategory