const express = require('express')
const router = express.Router()
const ProductC = require('../controllers/productController')
const {authentication, adminAuth, authorization} = require('../middlewares/auth')

router.get('/myproducts', authentication, ProductC.getMyProducts)
router.get('/', ProductC.getProducts)
router.get('/:id', function(req, res, next) {
    if(req.headers.access_token) {authentication(req, res, next)}
    else {next()}
}, ProductC.getProducts)
router.post('/', authentication, ProductC.postProduct)
router.put('/:id', authentication, ProductC.putProduct)
router.delete('/:id', authentication, ProductC.delProduct)

module.exports = router