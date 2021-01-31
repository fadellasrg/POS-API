const{
    modelAllCategory,
    modelDetailCategory,
    modelInsertCategory,
    modelUpdateCategory,
    modelUpdateCategoryPatch,
    modelDeleteCategory,
    modelTotalCategory
} = require('../models/category')

const { success, failed, notFound } = require('../helpers/response')

module.exports = {
    getAllCategory: async (req, res)=>{
        try {
            const category = req.query.category ? req.query.category : '' 
            const limit = req.query.limit ? req.query.limit : 3
            const page = req.query.page ? req.query.page : 1
            const offset = page===1?0:(page-1)*limit
            const responseTotal = await modelTotalCategory()
            
            modelAllCategory(category, offset, limit)
            .then((response)=>{
                const data = response
                const pagination = {
                    page: page,
                    limit: limit,
                    totalData: responseTotal[0].total,
                    totalPage: Math.ceil(responseTotal[0].total / limit)
                }
                if(response.length > 0){
                    success(res, data, pagination, 'Get all category success')
                }else{
                    notFound(res,"Data unavailable", data)
                }
            }).catch((err)=>{
                failed(res, 'Internal server error', err)
            })
        } catch (error) {
            failed(res, 'Internal server error', err)
        }
    },
    getDetailCategory: (req, res)=>{
        try {
            const id_category = req.params.id
            
            modelDetailCategory(id_category)
            .then((response)=>{
                if(response.length > 0){
                    success(res, response, {}, 'Get detail category success')
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
    insertCategory: (req, res)=>{
        try {
            const data = req.body
            if(!data.category){
                failed(res, 'All textfield is required!', [])
            }else{
                modelInsertCategory(data)
                .then((response)=>{
                    success(res, response, {}, 'Insert category success')
                }).catch(()=>{
                    failed(res, 'Internal server error', [])
                })
            }
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    updateCategory: (req, res)=>{
        try {
            const data = req.body
            const id_category = req.params.id
            if(!data.category){
                failed(res, 'All textfield is required!', [])
            }else{
                modelUpdateCategory(data, id_category)
                .then((response)=>{
                    success(res, response, {}, 'Update category success')
                }).catch(()=>{
                    failed(res, 'Internal server error', [])
                })
            }
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    updateCategoryPatch: (req, res)=>{
        try {
            const data = req.body
            const id_category = req.params.id
    
            modelUpdateCategoryPatch(data, id_category)
            .then((response)=>{
                success(res, response, {}, 'Update category success')
            }).catch(()=>{
                failed(res, 'Internal server error', [])
            })
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    deleteCategory: (req, res)=>{
        try {
            const id = req.params.id
    
            modelDeleteCategory(id)
            .then((response)=>{
                if(response.affectedRows === 0){
                    notFound(res,"Data unavailable", response)
                }else{
                    success(res, response, {}, 'Delete category success')
                }
            }).catch((err)=>{
                failed(res, 'Internal server error', [])
            })
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    }
}