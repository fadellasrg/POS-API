const bcrypt = require ('bcrypt')
const { mRegister, mCheckEmail } = require ('../models/users')
const { success, failed, notFound } = require('../helpers/response')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../helpers/env')

module.exports = {
    login: (req, res) => {
        const body = req.body
        mCheckEmail(body.email).then( async (response) => {
            if(response.length === 1){
                const checkPassword = await bcrypt.compare(body.password, response[0].password)
                if(checkPassword){
                    const dataUser = {  // data to be encrypted by JWT
                        id: response[0].id,
                        email: response[0].email,
                        access: response[0].access
                    }
                    const token = jwt.sign(dataUser, JWT_SECRET)
                    res.json({
                        message: 'Login success',
                        token     // same property and value
                    })
                    // success(res, `Token = ${token}`, {}, 'Login success')
                }else{
                    failed(res, 'Login failed, please check your password', {})
                }
            }else{
                notFound(res,"Email not found", {})
            }
        }).catch((err) => {
            failed(res, 'Internal server error', err)
        })
    },
    register: async(req, res) => {
        const body = req.body
        mCheckEmail(body.email).then( async (response) => {
            if(response.length >= 1){
                failed(res, 'Email has been registered', {})
            }else{
                // use salt to add a unique code in password
                const salt = await bcrypt.genSalt(10) // 10 to make code more unique (optional)
                const password = await bcrypt.hash(body.password, salt)
                const user = {
                    name: body.name,
                    email: body.email,
                    access: body.access,
                    password // same property and value
                }
                mRegister(user).then((response) => {
                    success(res, {}, {}, 'Register success')
                }).catch((err) => {
                    failed(res, 'Internal server error', err)
                })
            }
        }).catch((err) => {
            failed(res, 'Internal server error', err)
        })
    }
}