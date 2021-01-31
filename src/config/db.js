const mysql = require('mysql2')
const { DB_USER, DB_PASSWORD } = require('../helpers/env')

const connection = mysql.createConnection({
    host: 'localhost',
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'db_pos'
})

module.exports = connection