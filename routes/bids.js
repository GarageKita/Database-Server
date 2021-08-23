const express = require('express')
const router = express.Router()
const BidsC = require('../controllers/bidController')
const {authentication, adminAuth, authorization} = require('../middlewares/auth')

router.post('/:id', authentication, BidsC.postBid)
router.put('/:id', authentication, BidsC.putBid)
router.get('/mybids', authentication, BidsC.getMyBids)
router.get('/:id', authentication, BidsC.getProductBid)
router.delete('/:id', authentication, BidsC.delBid)


module.exports = router