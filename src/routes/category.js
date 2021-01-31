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
    .get('/category', authentication, getAllCategory)                                 // access for admin & cashier
    .get('/detailCategory/:id', authentication, getDetailCategory)                    // access for admin & cashier
    .post('/category', authentication, authorizationAdmin, insertCategory)            // access for admin
    .put('/category/:id', authentication, authorizationAdmin, updateCategory)         // access for admin
    .patch('/category/:id', authentication, authorizationAdmin, updateCategoryPatch)  // access for admin
    .delete('/category/:id', authentication, authorizationAdmin, deleteCategory)      // access for admin

    
module.exports = routeCategory