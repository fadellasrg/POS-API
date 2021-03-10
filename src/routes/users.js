const { login, register } = require('../controllers/users')
const express = require('express')

const Router = express.Router()

Router
    .post('/api/login', login)
    .post('/api/register', register)

module.exports= Router