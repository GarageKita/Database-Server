const express = require('express')
const router = express.Router()
const AddressC = require('../controllers/addressController')
const {authentication, adminAuth, authorization} = require('../middlewares/auth')

router.post('/', authentication, AddressC.postAddress)
router.put('/:id', authentication, AddressC.putAddress)
router.get('/myaddress', authentication, AddressC.getMyAddress)
router.delete('/:id', authentication, AddressC.delAddress)


module.exports = router