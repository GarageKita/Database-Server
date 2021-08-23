const {Cart, User, Product} = require('../models/index')

class Controller {
    static addCart(req, res, next){
        Cart.findOne({where: {ProductId: req.params.id, UserId: req.currentUser.id}, attributes: ['id']})
            .then(item => {
                if (item) {
                    console.log(item)
                    Cart.update(req.body, {where:{id: item.id}})
                        .then(() => res.status(200).json('added to cart'))
                }
                else {
                    Cart.create({
                        ProductId: req.params.id,
                        UserId: req.currentUser.id,
                        toBuy: req.body.toBuy
                    })
                    .then(() => res.status(200).json('added to cart'))
                }
            })
            .catch(err => next(err))
    }
    
    static delCart(req, res, next){
        Cart.destroy({where:{id:req.params.id}, returning: true})
            .then(r => {
                res.status(200).json('delete success')
            })
            .catch(err => next(err))
    }

    static getCart(req, res, next){
        Cart.findAll({where: {UserId: req.currentUser.id}, include:[{model: Product}],  attributes: ['id', 'toBuy']})
            .then(carts =>{
                res.status(200).json(carts)
            })
            .catch(err => next(err))
    }

    static buyItem(req, res, next){
        let itemBought = req.body.toBuy
        Cart.findOne({where: {ProductId: req.params.id, UserId: req.currentUser.id}, attributes: ['id']})
            .then(item => {
                return Cart.destroy({where:{id: item.id}})
            })
            .then(() => {
                return Product.findOne({where: {id: req.params.id}})
            })
            .then(product => {
                product.stock = product.stock - itemBought
                console.log(product)
                return Product.update({stock: product.stock}, {where: {id: product.id}})
            })
            .then(() =>{
                console.log('updated')
                res.status(200).json('Purchase complete')
            })
            .catch(err => next(err))
    }
}

module.exports = Controller