const express = require('express')
const router = express.Router()
const UserC = require('../controllers/userController')
const CategoryC = require('../controllers/categoryController')
const RequestC = require('../controllers/requestController')
const categoryRoute = require('./categories')
const requestRoute = require('./requests')
const productRoute = require('./products')

const {authentication, adminAuth, authorization} = require('../middlewares/auth')

// user
router.post('/login', authentication, adminAuth, UserC.login)
router.post('/register', UserC.register)
router.put('/user/:id', UserC.putUser)

router.use('/categories', categoryRoute)
router.use('/requests', requestRoute)
router.use('/products', productRoute)

module.exports = router