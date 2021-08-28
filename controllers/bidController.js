const {Bid, Product, User} = require('../models/index')

class Controller {
    static postBid(req, res, next) {
        const newBid = req.body
        newBid.product_id = req.params.id
        newBid.consumer_id = req.currentUser.id
        newBid.status = "pending"
        Bid.create(newBid, {returning: true})
            .then(data => res.status(201).json({message: "success", data}))
            .catch(err => next(err))
    }
    static putBid(req, res, next){
        Bid.update(req.body,{where: {id: req.params.id}, returning:true})
            .then((data) => {
                if(data[0] == 0) throw {name: "notFound", message: "bid not found"}
                res.status(200).json({message: "success", data: data[1][0]})
            })
            .catch(err => next(err))
                .catch(err => next(err))
    }
    static getProductBid(req, res, next){
        Bid.findAll({where: {product_id: req.params.id},  include: [{
            model: User,
            attributes: ['username']
        }, Product]})
        .then(data => res.status(200).json({message: "success", data}))
        .catch(err => next(err))
    }
    static getMyBids(req, res, next){
        Bid.findAll({where: {consumer_id: req.currentUser.id},  include: [{
            model: User,
            attributes: ['username']
        }, Product]})
        .then(data => res.status(200).json({message: "success", data}))
        .catch(err => next(err))
    }
    static getBid(req, res, next){
        Bid.findOne({where: {id: req.params.id}, include: [{
            model: User,
            attributes: ['username']
        }, Product]})
        .then(data => 
                {
                    if (!data) throw {name: "notFound", message: "bid not found"}
                    res.status(200).json({message: "success", data})
                }
            )
        .catch(err => next(err))
    }
    static delBid(req, res, next){
        Bid.destroy({where: {id: req.params.id}})
        .then(re => {
            if(re == 0) throw {name: "notFound", message: "bid not found"}
            res.status(200).json({message: "success"})
        })
        .catch(err => next(err))
    }
}

module.exports = Controller