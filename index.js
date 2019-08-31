const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const storage = require('./upload-config')
const upload = multer(storage)
const path = require('path')
const fs = require('fs')
const app = express()

const router = new express.Router
app.use(router)

router.get('/', (req, res) => {
    res.send('ok')
})
router.post('/upload',upload.single('image') ,async (req, res) => {
   const { filename: image } = req.file 
   
   await sharp(req.file.path)
    .resize(500)
    .jpeg({quality: 50})
    .toFile(
        path.resolve(req.file.destination,'resized',image)
    )
    fs.unlinkSync(req.file.path)

    return res.send('SUCCESS!')
})
app.listen(3333, () => {
    console.log('server on!')
})