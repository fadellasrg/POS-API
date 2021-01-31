//  token authentication
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./../env')
const { success, failed, notFound } = require('./../response')

module.exports = {
    authentication: (req, res, next) => {
        const headers = req.headers
        if(!headers.token){
            failed(res, 'Token required', {})
        }else{
            jwt.verify(headers.token, JWT_SECRET, (err, decoded) => {
                if(err){
                    failed(res, 'Invalid token', err)
                }else{
                    res.userAccess = decoded.access
                    next()
                }
            })
        }
    },
    authorizationAdmin: (req, res, next) => {
        const access = res.userAccess
        if(access === 0){
            next()
        }else{
            failed(res, 'Can not access this endpoint, error authorization ', {})
        }
    },
    authorizationCashier: (req, res, next) => {
        const access = res.userAccess
        if(access === 1){
            next()
        }else{
            failed(res, 'Can not access this endpoint, error authorization ', {})
        }
    },
}