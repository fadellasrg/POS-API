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

routeCategory
    .get('/category', getAllCategory)
    .get('/detailCategory/:id', getDetailCategory)
    .post('/category', insertCategory)
    .put('/category/:id', updateCategory)
    .patch('/category/:id', updateCategoryPatch)
    .delete('/category/:id', deleteCategory)

    
module.exports = routeCategory