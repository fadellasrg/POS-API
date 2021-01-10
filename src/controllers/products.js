const{
    modelAllProducts,
    modelDetailProducts,
    modelInsertProducts,
    modelUpdateProducts,
    modelUpdateProductsPatch,
    modelDeleteProducts
} = require('../models/products')
const { convertToRupiah } = require('../helpers/currency')

module.exports = {
    getAllProducts: (req, res)=>{
        const name_product = req.query.name_product
        const param = req.query.param
        const sort = req.query.sort
        const limit = req.query.limit
        const page = req.query.page
        const offset = page===1?0:(page-1)*limit
        
        modelAllProducts(name_product, param, sort, offset, limit)
        .then((response)=>{
            const arr = []
            for(let i = 0; i < response.length; i++){
                const result = {
                    "id_product": response[i].id_product,
                    "name": response[i].name,
                    "image": response[i].image,
                    "price": convertToRupiah(response[i].price),
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
                res.json(arr)
            }else{
                res.json("DATA UNAVAILABLE")
            }
        }).catch(()=>{
            res.json("FAILED. PLEASE CHECK YOUR INPUT")
        })
    },
    getDetailProducts: (req, res)=>{
        const id = req.params.id
        
        modelDetailProducts(id)
        .then((response)=>{
            const arr = []
            for(let i = 0; i < response.length; i++){
                const result = {
                "id_product": response[i].id_product,
                "name": response[i].name,
                "image": response[i].image,
                "price": convertToRupiah(response[i].price),
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
                res.json(arr)
            }else{
                res.json("DATA UNAVAILABLE")
            }
        }).catch((err)=>{
            console.log(err)
        })
    },
    insertProducts: (req, res)=>{
        const data = req.body
        
        modelInsertProducts(data)
        .then(()=>{
            res.json("SUCCESS")
        }).catch(()=>{
            res.json("FAILED. PLEASE CHECK AND INPUT ALL FIELD")
        })
    },
    updateProducts: (req, res)=>{
        const data = req.body
        const id = req.params.id

        modelUpdateProducts(data, id)
        .then(()=>{
            res.json("DATA UPDATED")
        }).catch(()=>{
            res.json("FAILED. PLEASE CHECK AND INPUT ALL FIELD")
        })
    },
    updateProductsPatch: (req, res)=>{
        const data = req.body
        const id = req.params.id

        modelUpdateProductsPatch(data, id)
        .then(()=>{
            res.json("DATA UPDATED")
        }).catch(()=>{
            res.json("FAILED. PLEASE CHECK YOUR DATA")
        })
    },
    deleteProducts: (req, res)=>{
        const id = req.params.id

        modelDeleteProducts(id)
        .then((response)=>{
            if(response.affectedRows === 0){
                res.json("DATA UNAVAILABLE")
            }else{
                res.json("DATA DELETED")
            }
        }).catch((err)=>{
            res.json(err)
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