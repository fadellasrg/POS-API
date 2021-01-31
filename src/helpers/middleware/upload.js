const multer = require('multer')
const path = require('path')    // from node.js
const { success, failed, notFound } = require('../response')

// setup storage
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // default path multer is in root folder
        cb(null, './public/images')         // first parameter -> if there's an error // if not, set the value to null
    },
    filename: (req, file, cb) => {          // to make each image with different name
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})

// linking multer with storage
const multerUpload = multer ({
    storage: multerStorage,
    limits: { fieldSize: 1 * 1000 * 1000},
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if(ext === '.png' || ext === '.jpg' || ext === '.jpeg'){
            cb(null, true)
        }else{
            cb({error: 'File type error'}, false)
        }
    }
})

// middleware
const singleUpload = (req, res, next) => {
    // process upload multer
    const multerSingle = multerUpload.single('image')   // 'image' = field name in body
    multerSingle(req, res, (err) => {
        if(err){
            failed(res, 'Upload failed', err)
        }else{
            next()
        }
    })
}

module.exports = singleUpload