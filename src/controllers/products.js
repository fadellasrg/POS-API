const{
    modelAllProducts,
    modelDetailProducts,
    modelInsertProducts,
    modelUpdateProducts,
    modelUpdateProductsPatch,
    modelDeleteProducts,
    modelTotalProducts,
    modelAllProductsCategory,
    modelAllProductsForRedis
} = require('../models/products')
// const { convertToRupiah } = require('../helpers/currency')
const { success, failed, notFound } = require('../helpers/response')
const redisClient = require('../config/redis')
const fs = require('fs')

module.exports = {
    setDataRedis: () => {
        modelAllProductsForRedis().then((response) => {
            const data = JSON.stringify(response)   // from JSON to text
            redisClient.set('dataProducts', data)
        }).catch((err) => {
            failed(res, 'Internal server error', [])
        })
    },
    getAllProducts: async (req, res)=>{
        try {
            const searchParams = req.query.searchParams ? req.query.searchParams : 'name'
            const search = req.query.search ? req.query.search : ''
            const param = req.query.param ? req.query.param : 'id_product'
            const sort = req.query.sort ? req.query.sort : 'ASC'
            const limit = req.query.limit ? req.query.limit : 3
            const page = req.query.page ? req.query.page : 1
            const offset = page===1 ? 0 : (page-1)*limit
            const responseTotal = await modelTotalProducts(searchParams, search) // count total page
        
            modelAllProducts(searchParams, search, param, sort, offset, limit)
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
                    success(res, data, pagination, 'Get all products from database success')
                }else{
                    notFound(res,"Data unavailable", data)
                }
            }).catch((err)=>{
                // failed(res, 'Internal server error', err)
                console.log(err)
            })
        } catch (error) {
            // failed(res, 'Internal server error', [])
            console.log(error)
        }
    },
    getDetailProducts: (req, res)=>{
        try {
            const id = req.params.id
            
            modelDetailProducts(id)
            .then((response)=>{
                if(response.length > 0){
                    success(res, response, {}, 'Get detail product success')
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
    insertProducts: (req, res)=>{
        try {
            const data = {
                name: req.body.name,
                image: req.body.image,
                price: req.body.price,
                id_category: req.body.id_category,
                images: req.file.filename   // from single upload multer
            }
            // res.json({   // to check multer
            //     status: true,
            //     multer: req.file.filename
            // })
            if(!data.name || !data.image || !data.price || !data.id_category || !data.images){
                const path = `./public/images/${data.images}`
                fs.unlinkSync(path)
                failed(res, 'All textfield is required!', [])

            }else{
                modelInsertProducts(data)
                .then((response)=>{
                    module.exports.setDataRedis()
                    success(res, response, {}, 'Insert product success')
                }).catch((err)=>{
                    failed(res, 'All textfield is required!', [])
                })
            }
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    updateProducts: async (req, res)=>{
        try {
            // const data = req.body
            const id = req.params.id
            const detail = await modelDetailProducts(id)
            const data = {
                name: req.body.name,
                image: req.body.image,
                price: req.body.price,
                id_category: req.body.id_category,
                images: req.file.filename  // from single upload multer
            }

            if(!data.name || !data.image || !data.price || !data.id_category || !data.images){
                failed(res, 'All textfield is required!', [])
            }else{
                modelUpdateProducts(data, id)
                .then((response)=>{
                    const path = `./public/images/${detail[0].images}`
                    fs.unlinkSync(path)
                    module.exports.setDataRedis()
                    success(res, response, {}, 'Update product success')
                }).catch(()=>{
                    failed(res, 'All textfield is required!', [])
                })
            }
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    updateProductsPatch: async (req, res)=>{
        try {
            const data = req.body
            const id = req.params.id
            const detail = await modelDetailProducts(id)
            if(req.file){
                data.images = req.file.filename
                // const path = `${process.cwd()}/public/images/${detail[0].images}`
                // if (fs.existsSync(path)) {
                //     fs.unlinkSync(path)
                // }
                const path = `./public/images/${detail[0].images}`
                fs.unlinkSync(path)
            }
            modelUpdateProductsPatch(data, id)
            .then((response)=>{
                module.exports.setDataRedis()
                success(res, response, {}, 'Update product success')
            }).catch((err)=>{
                failed(res, 'Please input all field!', [])
            }) 
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    deleteProducts: async (req, res)=>{
        try {
            const id = req.params.id
            const detail = await modelDetailProducts(id)

            modelDeleteProducts(id)
            .then((response)=>{
                if(response.affectedRows === 0){
                    notFound(res,"Data unavailable", response)
                }else{
                    const path = `./public/images/${detail[0].images}`
                    fs.unlinkSync(path)
                    module.exports.setDataRedis()
                    success(res, response, {}, 'Delete product success')
                }
            }).catch((err)=>{
                failed(res, 'Internal server error', [])
            })
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    getAllProductsCategory: (req, res)=>{
        const name_category = req.query.name_category?req.query.name_category:''
        const param = req.query.param?req.query.param:'id_product'
        const sort = req.query.sort?req.query.sort:'ASC'
        const limit = req.query.limit?req.query.limit:100
        const page = req.query.page?req.query.page:1
        const offset = page===1?0:(page-1)*limit
        
        modelAllProductsCategory(name_category, param, sort, offset, limit)
        .then((response)=>{
            const arr = []
            for(let i = 0; i < response.length; i++){
                const result = {
                    "id_product": response[i].id_product,
                    "name": response[i].name,
                    "image": response[i].image,
                    "price": response[i].price,
                    "create_at": response[i].create_at,
                    "id_category": response[i].id_category,
                    "category": response[i].category
                }   
                arr.push({
                    "id_product": result.id_product,
                    "name": result.name,
                    "image": result.image,
                    "price": result.price,
                    "create_at": result.create_at,
                    "id_category": result.id_category,
                    "category": result.category
                })
            }
            if(response.length > 0){
                module.exports.setDataRedis()
                res.json(arr)
                // console.log(response)
            }else{
                res.json("DATA UNAVAILABLE")
                // console.log(response)
            }
        }).catch((err)=>{
            res.json("FAILED. PLEASE CHECK YOUR INPUT")
            // console.log(err)
        })
    },
    // sortProducts: (req, res)=>{
    //     const name = req.query.name
    //     const sort = req.query.sort

    //     modelSortProducts(name, sort)
    //     .then((response)=>{
    //         res.json(response)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }
}