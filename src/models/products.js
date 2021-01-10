const connection = require('../config/db')

module.exports = {
    modelAllProducts: (name_product, param, sort ,offset, limit) => {
        return new Promise ((resolve, reject)=>{
            connection.query(`SELECT *, DATE_FORMAT (create_at, '%d %M %Y') create_at FROM tb_product
            LEFT JOIN tb_category ON tb_product.id_category = tb_category.id_category 
            WHERE name LIKE '%${name_product}%' ORDER BY ${param} ${sort}
            LIMIT ${offset}, ${limit} `
            ,(err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    modelDetailProducts: (id) => {
        return new Promise ((resolve, reject)=>{
            connection.query(`SELECT *, DATE_FORMAT (create_at, '%d %M %Y') create_at FROM tb_product 
            LEFT JOIN tb_category ON tb_product.id_category = tb_category.id_category
            WHERE id_product = '${id}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    modelInsertProducts: (data) => {
        return new Promise ((resolve, reject)=>{
            connection.query(`INSERT INTO tb_product (name, image, price, id_category)
            VALUES ( '${data.name}', '${data.image}', '${data.price}', '${data.id_category}' ) `
            , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    modelUpdateProducts: (data, id) => {
        return new Promise ((resolve, reject)=>{
            connection
            .query(`UPDATE tb_product 
            SET name = '${data.name}', image = '${data.image}', 
            price = '${data.price}', id_category = '${data.id_category}' WHERE id_product = '${id}'`
            , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    modelUpdateProductsPatch: (data, id) => {
        return new Promise ((resolve, reject)=>{
            connection
            .query(`UPDATE tb_product 
            SET ? WHERE id_product = ?`, [data, id]
            , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    modelDeleteProducts: (id) => {
        return new Promise ((resolve, reject)=>{
            connection
            .query(`DELETE FROM tb_product WHERE id_product = '${id}'`
            , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
    
    
    
    // modelSortProducts: (name, sort) => {
    //     return new Promise ((resolve, reject)=>{
    //         connection
    //         .query(`SELECT * FROM tb_product 
    //         LEFT JOIN tb_category ON tb_product.id_category = tb_category.id_category ORDER BY ${name} ${sort} `
            
    //         , (err, result)=>{
    //             if(err){
    //                 reject(new Error(err))
    //             }else{
    //                 resolve(result)
    //             }
    //         })
    //     })
    // },
    
}