const {Product, Tag, Cart, User} = require('../models')
const {jwtDecrypt} = require("../helpers/jwt")

class Controller{
    static getProducts(req, res, next){
        if(req.params.id){
            Request.findOne({where: {id: req.params.id}, include: 'Category'})
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
            Request.findAll({include: 'Category'})
            .then(data => {
                data.forEach(el => {
                    delete el.dataValues.priceFloor
                })
                res.status(200).json({message: "success", data})
            })
            .catch(err => next(err))
        }
    }

    static postProduct(req, res, next){
        let newProduct = req.body
        newProduct.consumer_id = req.currentUser.id
        Request.create(newProduct, {returning:true})
            .then(data => res.status(200).json({message: 'success', data}))
            .catch(err => next(err))
    }

    static putProduct(req, res, next){
        Request.update(req.body, {where: {id:req.params.id}, returning: true})
            .then((data) => {
                if(data[0] == 0) throw({name: "notFound", message: "request not found" })
                res.status(200).json({message: "success", data: data[1][0]})
            })
            .catch(err => next(err))
    }

    static delProduct(req, res, next){
        Request.destroy({where:{id: req.params.id}})
            .then((data) => {
                if(data == 0) throw({name: "notFound", message: "request not found"})
                console.log("data deleted")
                res.status(200).json({message: "success"})
            })
            .catch(err => next(err))
    }

    static getMyProducts(req, res, next){
        Request.findAll({where:{"consumer_id": req.currentUser.id}, include: 'Category'})
        .then(data => {
            console.log(data)
            res.status(200).json({message: "success", data})
        })
        .catch(err => next(err))
    }
}

module.exports = Controller