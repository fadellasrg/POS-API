const{
    modelAllHistory,
    modelDetailHistory,
    modelInsertHistory,
    modelUpdateHistory,
    modelUpdateHistoryPatch,
    modelDeleteHistory
} = require('../models/history')
const files = require('../helpers/currency')
const { convertToRupiah } = require('../helpers/currency')


module.exports = {
    getAllHistory: (req, res)=>{
        const name = req.query.name
        const limit = req.query.limit
        const page = req.query.page
        const offset = page===1?0:(page-1)*limit

        modelAllHistory(name, offset, limit)
        .then((response)=>{
            const arr = []
            for(let i = 0; i < response.length; i++){
                const result = {
                    "invoice": response[i].invoice,
                    "cashier": response[i].cashier,
                    "date": response[i].date,
                    "orders": response[i].orders,
                    "amount": convertToRupiah(response[i].amount)
                }   
                arr.push({"invoice ": result.invoice, "cashier ":result.cashier,"date": result.date, "orders": result.orders, "amount":result.amount})
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
    getDetailHistory: (req, res)=>{
        const id = req.params.id
        
        modelDetailHistory(id)
        .then((response)=>{
            const result = {
                "id": response[0].id,
                "invoice": response[0].invoice,
                "cashier": response[0].cashier,
                "date": response[0].date,
                "id_product": response[0].id_product,
                "qty": response[0].qty,
                "name": response[0].name,
                "image": response[0].image,
                "price": files.convertToRupiah(response[0].price),
                "create_at": response[0].create_at,
                "id_category": response[0].id_category
            }
            res.json(result)
        }).catch(()=>{
            res.json(`ID ${id} IS NOT AVAILABLE, PLEASE INPUT THE RIGHT ID`)
        })
    },
    insertHistory: (req, res)=>{
        const data = req.body
        // data.map(indeks => ({invoice: indeks.invoice,cashier: indeks.cashier,id_product:indeks.id_product,qty: indeks.qty}))
        data.map((indeks)=>{
            ({invoice: indeks.invoice,cashier: indeks.cashier,id_product:indeks.id_product,qty: indeks.qty})
            // console.log(indeks)
            modelInsertHistory(indeks)
            .then(()=>{
                // console.log(response)
                res.json("SUCCESS")
            }).catch(()=>{
                res.json("FAILED. PLEASE CHECK AND INPUT ALL FIELD")
                // console.log(err)
            })
        })   
    },
    updateHistory: (req, res)=>{
        const data = req.body
        const id = req.params.id

        modelUpdateHistory(data, id)
        .then(()=>{
            res.json("SUCCESS")
        }).catch(()=>{
            res.json("FAILED. PLEASE CHECK AND INPUT ALL FIELD")
        })
    },
    updateHistoryPatch: (req, res)=>{
        const data = req.body
        const id = req.params.id

        modelUpdateHistoryPatch(data, id)
        .then(()=>{
            res.json('DATA UPDATED')
        }).catch(()=>{
            res.json("FAILED. PLEASE CHECK YOUR DATA")
        })
    },
    deleteHistory: (req, res)=>{
        const id = req.params.id

        modelDeleteHistory(id)
        .then((response)=>{
            if(response.affectedRows === 0){
                res.json("DATA UNAVAILABLE")
            }else{
                res.json("DATA DELETED")
            }
        }).catch((err)=>{
            res.json(err.message)
        })
    }
}