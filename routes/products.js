const express = require('express')
const router = express.Router()
const ProductC = require('../controllers/productController')
const {authentication, prodAuth, condAuth} = require('../middlewares/auth')

router.get('/', condAuth, ProductC.getProducts)
router.get('/myproducts', authentication, ProductC.getMyProducts)
router.get('/category/:id', condAuth, ProductC.getByCategory)
router.get('/search/:string', condAuth, ProductC.searchProduct)
router.get('/:id', condAuth, ProductC.getProducts)
router.post('/', authentication, ProductC.postProduct)
router.put('/:id', authentication, prodAuth, ProductC.putProduct)
router.delete('/:id', authentication, prodAuth, ProductC.delProduct)

module.exports = router