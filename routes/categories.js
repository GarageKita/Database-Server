const express = require('express')
const router = express.Router()
const CategoryC = require('../controllers/categoryController')
const {authentication, adminAuth, authorization} = require('../middlewares/auth')

router.get('/', CategoryC.getCategory)
router.post('/', authentication, adminAuth, CategoryC.postCategory)
router.put('/:id', authentication, adminAuth, CategoryC.putCategory)
router.delete('/:id', authentication, adminAuth, CategoryC.delCategory)


module.exports = router