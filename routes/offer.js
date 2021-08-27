const express = require('express')
const router = express.Router()
const OfferC = require('../controllers/offerController')
const {authentication, offAuth} = require('../middlewares/auth')

router.post('/:id', authentication, OfferC.postOffer)
router.put('/:id', authentication, offAuth, OfferC.putOffer)
router.get('/myoffers', authentication, OfferC.getMyOffer)
router.get('/:id', authentication, OfferC.getRequestOffer)
router.delete('/:id', authentication, offAuth, OfferC.delOffer)


module.exports = router