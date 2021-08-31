const express = require('express')
const router = express.Router()
const RequestC = require('../controllers/requestController')
const {authentication, reqAuth, condAuth} = require('../middlewares/auth')

router.get('/', condAuth, RequestC.getRequest)
router.get('/myrequests', authentication, RequestC.getMyRequest)
router.get('/category/:id', condAuth, RequestC.getByCategory)
router.get('/search/:string', condAuth, RequestC.searchRequest)
router.get('/:id', condAuth, RequestC.getRequest)
router.post('/', authentication, RequestC.postRequest)
router.put('/:id', authentication, reqAuth, RequestC.putRequest)
router.delete('/:id', authentication, reqAuth, RequestC.delRequest)

module.exports = router