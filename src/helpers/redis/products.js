const client = require('../../config/redis')
const _ = require('lodash')
const { success, failed, notFound } = require('../response')

module.exports = {
    getAllProductsRedis: (req, res, next) => {
        client.get('dataProducts', (err, result) => {    // 'dataProducts' as key
            if(err){
                failed(res, 'Internal server error', [])
            }else{
                // data in redis
                if(result){
                    const response = JSON.parse(result)     // Text to JSON
                    const searchParams = req.query.searchParams ? req.query.searchParams : 'name'
                    const search = req.query.search ? req.query.search : ''
                    const param = req.query.param ? req.query.param : 'id_product'
                    const sort = req.query.sort ? req.query.sort : 'asc'
                    const limit = req.query.limit ? req.query.limit : 3
                    const page = req.query.page ? req.query.page : 1
                    const offset = page===1 ? 0 : (page-1)*limit    // start from ''
                    const filterData = _.filter(response, (item) => {
                        return item[searchParams].toString().toLowerCase().includes(search.toLowerCase())
                    })
                    if(filterData.length >= 1){
                        const sortData = _.orderBy(filterData, param, sort)
                        const paginationData = _.slice(sortData, offset, offset+limit)
                        const pagination = {
                            page: page,
                            limit: limit,
                            totalData: filterData.length,
                            totalPage: Math.ceil(filterData.length / limit)
                        }
                        success(res, paginationData, pagination, 'Get all products from redis success')
                    }else{
                        notFound(res,"Data unavailable", {})
                    }
                // get data from controller
                }else{
                    next()
                }
            }
        })
    }
}