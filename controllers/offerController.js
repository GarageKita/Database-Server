const {Offer, User, Product} = require('../models/index')

class Controller {
    static postOffer(req, res, next) {
        const newOffer = req.body
        newOffer.request_id = req.params.id
        newOffer.seller_id = req.currentUser.id
        newOffer.status = "pending"
        Product.findOne({where: {id: newOffer.product_id}})
            .then(data => {
                if (data.seller_id === newOffer.seller_id) return (1)
                else throw {name: "unauthorized", message:"you can only offer your own products"}
            })
            .then (() => Offer.create(newOffer, {returning: true}))
            .then(data => res.status(201).json({message: "success", data}))
            .catch(err => next(err))
        }

    static putOffer(req, res, next){
        Product.findOne({where: {id: req.body.product_id}})
            .then(data => {
                if (data.seller_id === req.body.seller_id) return (1)
                else throw {name: "unauthorized", message:"you can only offer your own products"}
            })
            .then (() => Offer.update(req.body,{where: {id: req.params.id}, returning:true}))
            .then((data) => {
                if(data[0] == 0) throw {name: "notFound", message: "Category not found"}
                res.status(200).json({message: "success", data: data[1][0]})
            })
            .catch(err => next(err))
                .catch(err => next(err))
    }

    static getRequestOffer(req, res, next){
        Offer.findAll({where: {request_id: req.params.id}, include: [{
            model: User,
            attributes: ['username']
        }, Product]})
        .then(data => res.status(200).json({message: "success", data}))
        .catch(err => next(err))
    }

    static getMyOffer(req, res, next){
        Offer.findAll({where: {seller_id: req.currentUser.id}, include: [{
            model: User,
            attributes: ['username']
        }, Product]})
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