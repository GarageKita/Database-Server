const express = require('express')
const router = express.Router()
// const UserC = require('../controllers/user.js')
// const productC = require('../controllers/product')
// const tagC = require('../controllers/tags')
// const cartC = require('../controllers/cart-controller')
const UserC = require('../controllers/userController')
const CategoryC = require('../controllers/categoryController')
const RequestC = require('../controllers/requestController')
const categoryRoute = require('./categories')
const requestRoute = require('./requests')
const {authentication, adminAuth, authorization} = require('../middlewares/auth')
// const checkStock = require('../middlewares/checkStock')

// user
router.post('/login', UserC.login)
router.post('/register', UserC.register)

router.use('/categories', categoryRoute)
router.use('/requests', requestRoute)

// general
router.get('/requests', RequestC.getRequest)


module.exports = router