const{
    modelAllCategory,
    modelDetailCategory,
    modelInsertCategory,
    modelUpdateCategory,
    modelUpdateCategoryPatch,
    modelDeleteCategory
} = require('../models/category')

module.exports = {
    getAllCategory: (req, res)=>{
        const category = req.query.category
        const limit = req.query.limit
        const page = req.query.page
        const offset = page===1?0:(page-1)*limit
        
        modelAllCategory(category, offset, limit)
        .then((response)=>{
            if(response.length > 0){ 
                res.json(response)
            }else{
                res.json("DATA UNAVAILABLE")
            }
        }).catch(()=>{
            res.json("PLEASE INPUT THE RIGHT DATA")
        })
    },
    getDetailCategory: (req, res)=>{
        const id_category = req.params.id
        
        modelDetailCategory(id_category)
        .then((response)=>{
            if(response.length > 0){ 
                res.json(response)
            }else{
                res.json("DATA UNAVAILABLE")
            }
        }).catch((err)=>{
            res.json(err.message)
        })
    },
    insertCategory: (req, res)=>{
        const data = req.body
        
        modelInsertCategory(data)
        .then(()=>{
            if(data.category !== undefined)
            res.json("SUCCESS")
            else{
                res.json("FAILED. PLEASE CHECK YOUR INPUT")
            }
        }).catch(()=>{
            res.json("FAILED. PLEASE CHECK AND INPUT ALL FIELD")
        })
    },
    updateCategory: (req, res)=>{
        const data = req.body
        const id_category = req.params.id

        modelUpdateCategory(data, id_category)
        .then(()=>{
            res.json("DATA UPDATED")
        }).catch(()=>{
            res.json("FAILED. PLEASE CHECK AND INPUT ALL FIELD")
        })
    },
    updateCategoryPatch: (req, res)=>{
        const data = req.body
        const id_category = req.params.id

        modelUpdateCategoryPatch(data, id_category)
        .then(()=>{
            res.json("DATA UPDATED")
        }).catch(()=>{
            res.json("FAILED. PLEASE CHECK AND INPUT ALL FIELD")
        })
    },
    deleteCategory: (req, res)=>{
        const id = req.params.id

        modelDeleteCategory(id)
        .then((response)=>{
            if(response.affectedRows === 0){
                res.json("DATA UNAVAILABLE")
            }else{
                res.json("DATA DELETED")
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
}