const express = require('express')
const router = express.Router()
const RequestC = require('../controllers/requestController')
const {authentication, reqAuth} = require('../middlewares/auth')

router.get('/myrequests', authentication, RequestC.getMyRequest)
router.get('/', RequestC.getRequest)
router.get('/:id', function(req, res, next) {
    if(req.headers.access_token) {authentication(req, res, next)}
    else {next()}
}, RequestC.getRequest)
router.post('/', authentication, RequestC.postRequest)
router.put('/:id', authentication, reqAuth, RequestC.putRequest)
router.delete('/:id', authentication, reqAuth, RequestC.delRequest)

module.exports = router