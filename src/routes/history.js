const express = require('express')
const routeHistory = express.Router()
const{
    getAllHistory,
    getDetailHistory,
    insertHistory,
    updateHistory,
    updateHistoryPatch,
    deleteHistory
} = require('../controllers/history')
const { authentication, authorizationAdmin, authorizationCashier } = require('../helpers/middleware/auth')
const { getAllHistoryRedis } = require('../helpers/redis/history')

routeHistory
    .get('/history', authentication, getAllHistoryRedis, getAllHistory)             // access for admin & cashier
    .get('/detailHistory/:id', authentication, getDetailHistory)                    // access for admin & cashier
    .post('/history', authentication, authorizationCashier, insertHistory)          // access for cashier
    .put('/history/:id', authentication, authorizationAdmin, updateHistory)         // access for admin
    .patch('/history/:id', authentication, authorizationAdmin, updateHistoryPatch)  // access for admin
    .delete('/history/:id', authentication, authorizationAdmin, deleteHistory)      // access for admin

    
module.exports = routeHistory