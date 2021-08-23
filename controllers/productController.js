const {Product, Tag, Cart, User} = require('../models')
const {jwtDecrypt} = require("../helpers/jwt")

class Controller{
    static postProduct(req, res, next){
        let newProduct = req.body
        newProduct.seller_id = req.currentUser.id
        Product.create(newProduct)
            .then(data => {
                res.status(201).json({message: "success", data})
            })
            .catch(err => next(err))
    }

    static putProduct(req, res, next){
        Product.update(req.body, {where: {id:req.params.id}, returning: true})
            .then((product) => {
                if(product[0] == 0) throw({name: "notFound", message: "Product not found" })
                res.status(200).json("edit success")
            })
            .catch(err => next(err))
    }
    static delProduct(req, res, next){
        if(req.currentUser.role != 'admin') next({name:"unauthorized"})
        else{
            Product.destroy({where:{id: req.params.id}})
                .then((product) => {
                    if(product == 0) throw({name: "notFound", message: "Product not found"})
                    console.log("product deleted")
                    res.status(200).json({message: "Item deleted"})
                })
                .catch(err => next(err))
        }
    }
    static getProduct(req, res, next){
        let targetId = null
        if(req.headers.access_token) {targetId = jwtDecrypt(req.headers.access_token).id} 
        Product.findAll({include: [
            {
            model: Tag,
            through: {attributes: ['id']}
            },
            {
                model: Cart,
                where: {UserId: targetId? targetId : 0},
                required: false
            }
        ]})
            .then((products) => {
                if(products.length == 0) throw({name: "notFound", message: "Products not found"})
                res.status(200).json(products)
            })
            .catch(err => next(err))
    }
}

module.exports = Controller