const {Product, User} = require('../models/index')

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
                if(req.currentUser) {data = data.filter(el => el.seller_id = req.currentUser.id)}
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
        Product.update(req.body, {where: {id:req.params.id}, returning: true})
            .then((data) => {
                if(data[0] == 0) throw({name: "notFound", message: "request not found" })
                res.status(200).json({message: "success", data: data[1][0]})
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
        }, 'Category']})
        .then(data => {
            console.log(data)
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
            if(req.currentUser) data = data.filter(el => el.seller_id != req.currentUser.id)
            res.status(200).json({message: "success", data})
        })
        .catch(err => next(err))
    }
}

module.exports = Controller