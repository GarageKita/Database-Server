const {Offer} = require('../models/index')

class Controller {
    static postOffer(req, res, next) {
        const newOffer = req.body
        newOffer.request_id = req.params.id
        newOffer.seller_id = req.currentUser.id
        newOffer.status = "pending"
        // console.log(model)
        Offer.create(newOffer, {returning: true})
            .then(data => res.status(201).json({message: "success", data}))
            .catch(err => next(err))
    }
    static putOffer(req, res, next){
        Offer.update(req.body,{where: {id: req.params.id}, returning:true})
            .then((data) => {
                if(data[0] == 0) throw {name: "notFound", message: "Category not found"}
                res.status(200).json({message: "success", data: data[1][0]})
            })
            .catch(err => next(err))
                .catch(err => next(err))
    }
    static getRequestOffer(req, res, next){
        Offer.findAll({where: {request_id: req.params.id}})
        .then(data => res.status(200).json({message: "success", data}))
        .catch(err => next(err))
    }
    static getMyOffer(req, res, next){
        Offer.findAll({where: {seller_id: req.currentUser.id}})
        .then(data => res.status(200).json({message: "success", data}))
        .catch(err => next(err))
    }

    static delOffer(req, res, next){
        Offer.destroy({where: {id: req.params.id}})
        .then(re => {
            if(re == 0) throw {name: "notFound", message: "Offer not found"}
            res.status(200).json({message: "success"})
        })
        .catch(err => next(err))
    }
}

module.exports = Controller