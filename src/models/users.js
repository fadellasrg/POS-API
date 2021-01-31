const connection = require('../config/db')

module.exports = {
    mLogin: () => {
        return
    },
    mCheckEmail: (email) => {
        return new Promise ((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    },
    mRegister: (dataUser) => {
        return new Promise ((resolve, reject) => {
            connection.query(`INSERT INTO users SET ?`, dataUser, (err, result) => {
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }
}