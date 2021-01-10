const connection = require('../config/db')

module.exports = {
    modelAllHistory: (name, offset, limit) => {
        return new Promise ((resolve, reject)=>{
            connection.query(`SELECT CONCAT("#", invoice) invoice, cashier, DATE_FORMAT (date, '%d %M %Y') date, GROUP_CONCAT(name, ' ', qty, 'X') orders, 
            SUM(price*qty) amount 
            FROM tb_history LEFT JOIN tb_product ON tb_history.id_product = tb_product.id_product 
            WHERE invoice LIKE '%${name}%' GROUP BY invoice
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
    modelDetailHistory: (id) => {
        return new Promise ((resolve, reject)=>{
            connection.query(`SELECT * ,CONCAT("#", invoice) invoice, DATE_FORMAT (date, '%d %M %Y') date, 
            DATE_FORMAT (create_at, '%d %M %Y') create_at
            FROM tb_history
            LEFT JOIN tb_product ON tb_history.id_product = tb_product.id_product
            WHERE id = '${id}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    modelInsertHistory: (indeks) => {
        return new Promise ((resolve, reject)=>{
            connection.query(`INSERT INTO tb_history (invoice, cashier, id_product, qty)
            VALUES ( '${indeks.invoice}', '${indeks.cashier}', '${indeks.id_product}', '${indeks.qty}' ) `
            , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
                // console.log(indeks.invoice)
            })
        })
    },
    modelUpdateHistory: (data, id) => {
        return new Promise ((resolve, reject)=>{
            connection
            .query(`UPDATE tb_history 
            SET invoice = '${data.invoice}', cashier = '${data.cashier}', id_product = '${data.id_product}', qty = '${data.qty}'
            WHERE id = '${id}'`
            , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    modelUpdateHistoryPatch: (data, id) => {
        return new Promise ((resolve, reject)=>{
            connection
            .query(`UPDATE tb_history SET ? WHERE id = ?`, [data, id]
            , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    modelDeleteHistory: (id) => {
        return new Promise ((resolve, reject)=>{
            connection
            .query(`DELETE FROM tb_history WHERE id = '${id}'`
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