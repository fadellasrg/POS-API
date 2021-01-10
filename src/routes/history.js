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

routeHistory
    .get('/history', getAllHistory)
    .get('/detailHistory/:id', getDetailHistory)
    .post('/history', insertHistory)
    .put('/history/:id', updateHistory)
    .patch('/history/:id', updateHistoryPatch)
    .delete('/history/:id', deleteHistory)

    
module.exports = routeHistory