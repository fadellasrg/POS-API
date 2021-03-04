const{
    modelAllHistory,
    modelDetailHistory,
    modelInsertHistory,
    modelUpdateHistory,
    modelUpdateHistoryPatch,
    modelDeleteHistory,
    modelTotalHistory,
    modelAllHistoryForRedis
} = require('../models/history')
const { success, failed, notFound } = require('../helpers/response')
const redisClient = require('../config/redis')


module.exports = {
    setDataRedis: () => {
        modelAllHistoryForRedis().then((response) => {
            const data = JSON.stringify(response)
            redisClient.set('dataHistory', data)
        }).catch((err) => {
            failed(res, 'Internal server error', [])
        })
    },
    getAllHistory: async (req, res)=>{
        try {
            const searchParams = req.query.searchParams ? req.query.searchParams : 'invoice'
            const search = req.query.search ? req.query.search : ''
            const param = req.query.param ? req.query.param : 'id'
            const sort = req.query.sort ? req.query.sort : 'ASC'
            const limit = req.query.limit?req.query.limit : 3
            const page = req.query.page?req.query.page : 1
            const offset = page===1?0:(page-1)*limit
            const responseTotal = await modelTotalHistory(searchParams, search)
    
            modelAllHistory(searchParams, search, param, sort, offset, limit)
            .then((response)=>{
                const data = response
                const pagination = {
                    page: page,
                    limit: limit,
                    totalData: responseTotal[0].total,
                    totalPage: Math.ceil(responseTotal[0].total / limit)
                }
                if(response.length > 0){
                    module.exports.setDataRedis()
                    success(res, data, pagination, 'Get all history from database success')
                }else{
                    notFound(res,"Data unavailable", data)
                }
            }).catch((err)=>{
                // failed(res, 'Internal server error', [])
                console.log(err)
            })
        } catch (error) {
            // failed(res, 'Internal server error', [])
            console.log(error)
        }
    },
    getDetailHistory: (req, res)=>{
        try {
            const invoice = req.params.id ? req.params.id : ''

            modelDetailHistory(invoice)
            .then((response)=>{
                if(response.length > 0){
                    success(res, response, {}, 'Get detail history success')
                }else{
                    notFound(res,"Data unavailable", response)
                }
            }).catch(()=>{
                failed(res, 'Internal server error', [])
            })
            
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    insertHistory: (req, res)=>{
        try {
            const data = req.body
            let isCheck = true

            for(let indeks = 0; indeks < data.length; indeks++){
                if(!data[indeks].invoice || !data[indeks].cashier || !data[indeks].id_product || !data[indeks].qty){
                    isCheck = false
                    break
                }else{
                    isCheck = true
                }
            }
            if(isCheck === false){
                failed(res, 'All textfield is required!', [])
            }else{
                data.forEach(async(indeks) => {
                    await modelInsertHistory(indeks).then((response) => {
                        return response
                    }).catch((err) => {
                        return err
                    })
                })
                module.exports.setDataRedis()
                success(res, {}, {}, 'Insert history success')
            }
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    updateHistory: (req, res)=>{
        try {
            const data = req.body
            const id = req.params.id
            if(!data.invoice || !data.cashier || !data.id_product || !data.qty){
                failed(res, 'All textfield is required!', [])
            }else{
                modelUpdateHistory(data, id)
                .then((response)=>{
                    module.exports.setDataRedis()
                    success(res, response, {}, 'Update history success')
                }).catch(()=>{
                    failed(res, 'Internal server error', [])
                })
            }
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    updateHistoryPatch: (req, res)=>{
        try {
            const data = req.body
            const id = req.params.id
    
            modelUpdateHistoryPatch(data, id)
            .then((response)=>{
                module.exports.setDataRedis()
                success(res, response, {}, 'Update history success')
            }).catch(()=>{
                failed(res, 'Internal server error', [])
            })
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    deleteHistory: (req, res)=>{
        try {
            const id = req.params.id
    
            modelDeleteHistory(id)
            .then((response)=>{
                if(response.affectedRows === 0){
                    notFound(res,"Data unavailable", response)
                }else{
                    module.exports.setDataRedis()
                    success(res, response, {}, 'Delete history success')
                }
            }).catch((err)=>{
                failed(res, 'Internal server error', [])
            })
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    }
}