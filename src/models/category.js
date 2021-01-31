const connection = require('../config/db')

module.exports = {
    modelAllCategory: (category, offset, limit) => {
        return new Promise ((resolve, reject)=>{
            connection.query(`SELECT * FROM tb_category
            WHERE category LIKE '%${category}%'
            LIMIT ${offset}, ${limit} `,
            (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    modelTotalCategory: () => {
        return new Promise ((resolve, reject)=>{
            connection.query(`SELECT COUNT(*) as total FROM tb_category `
            ,(err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    modelDetailCategory: (id_category) => {
        return new Promise ((resolve, reject)=>{
            connection.query(`SELECT * FROM tb_category WHERE id_category = '${id_category}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    modelInsertCategory: (data) => {
        return new Promise ((resolve, reject)=>{
            connection.query(`INSERT INTO tb_category (category)
            VALUES ( '${data.category}' ) `
            , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    modelUpdateCategory: (data, id_category) => {
        return new Promise ((resolve, reject)=>{
            connection
            .query(`UPDATE tb_category 
            SET category = '${data.category}' WHERE id_category = '${id_category}'`
            , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    modelUpdateCategoryPatch: (data, id_category) => {
        return new Promise ((resolve, reject)=>{
            connection
            .query(`UPDATE tb_category SET ? WHERE id_category = ?`, [data, id_category]
            , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    modelDeleteCategory: (id_category) => {
        return new Promise ((resolve, reject)=>{
            connection
            .query(`DELETE FROM tb_category WHERE id_category = '${id_category}'`
            , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
}