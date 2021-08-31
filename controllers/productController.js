const {Product, User} = require('../models/index')
const {Op} = require('sequelize')

class Controller{
    static getProducts(req, res, next){
        if(req.params.id){
            Product.findOne({where: {id: req.params.id}, include: [{
                model: User,
                attributes: ['username']
            }, 'Category']})
            .then(data => {
                if(req.currentUser){
                    if(data.seller_id === req.currentUser.id){
                        res.status(200).json({message: "sucsess", data})
                    }
                    else {
                        delete data.priceFloor
                        res.status(200).json({message:"success", data})
                    }
                }
                else {
                    delete data.priceFloor
                    res.status(200).json({message:"success", data})
                }
            })
            .catch(err => next(err))
        }
        else {
            Product.findAll({include: [{
                model: User,
                attributes: ['username']
            }, 'Category']})
            .then(data => {
                data.forEach(el => {
                    delete el.dataValues.priceFloor
                })
                if(req.currentUser) {
                    console.log('a')
                    data = data.filter(el => el.seller_id !== req.currentUser.id)
                }
                res.status(200).json({message: "success", data})
            })
            .catch(err => next(err))
        }
    }

    static postProduct(req, res, next){
        let newProduct = req.body
        newProduct.seller_id = req.currentUser.id
        Product.create(newProduct, {returning:true})
            .then(data => res.status(200).json({message: 'success', data}))
            .catch(err => next(err))
    }

    static putProduct(req, res, next){
        Product.update(req.body, {where: {id:req.params.id}, returning: true, include: ['Category']})
            .then((data) => {
                if(data[0] == 0) throw({name: "notFound", message: "request not found" })
                return Product.findOne({where: {id: req.params.id}, include: [{
                    model: User,
                    attributes: ['username']
                }, 'Category']})
            })
            .then((data) => {
                res.status(200).json({message: "success", data})
            })
            .catch(err => next(err))
    }

    static delProduct(req, res, next){
        Product.destroy({where:{id: req.params.id}})
            .then((data) => {
                if(data == 0) throw({name: "notFound", message: "request not found"})
                console.log("data deleted")
                res.status(200).json({message: "success"})
            })
            .catch(err => next(err))
    }

    static getMyProducts(req, res, next){
        Product.findAll({where:{"seller_id": req.currentUser.id}, include: [{
            model: User,
            attributes: ['username']
        }, 'Category', 'Bids']})
        .then(data => {
            console.log(data)
            data.forEach(el => {
                if (el.Bids) if(el.Bids.some(i => i.offered_price <= el.priceFloor? el.priceFloor : el.price)) {el.dataValues.inRange = true}
            })
            res.status(200).json({message: "success", data})
        })
        .catch(err => next(err))
    }
    
    static getByCategory(req, res, next){
        Product.findAll({where:{category_id: req.params.id}, include: [{
            model: User,
            attributes: ['username']
        }, 'Category']})
        .then(data => {
            if(req.currentUser) data = data.filter(el => el.seller_id !== req.currentUser.id)
            res.status(200).json({message: "success", data})
        })
        .catch(err => next(err))
    }

    static searchProduct(req, res, next){
        console.log(req.params.string)
        Product.findAll({where: {name: {[Op.iLike]: `%${req.params.string}%`}}, include: [{
            model: User,
            attributes: ['username']
        }, 'Category']})
        .then(data => {
            if(req.currentUser) data = data.filter(el => el.seller_id != req.currentUser.id)
            res.status(200).json({message: "success", data})
        })
        .catch(err => next(err))
    }
}

module.exports = Controller