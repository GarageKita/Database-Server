const {jwtDecrypt} = require("../helpers/jwt")
const {User, Product, Request, Offer, Bid} = require('../models/index.js')

const authentication = (req, res, next) =>{
    console.log("in auth2")
    try{
        const dataDecoded = jwtDecrypt(req.headers.access_token)
        User.findByPk(dataDecoded.id)
            .then(user => {
                if (!user) throw {name: "notFound", message:"User not found"}
                else{
                    console.log('user found')
                    req.currentUser = {id: user.id, role:user.role}
                    next()
                } 
            })
            .catch(err => {
                next(err)
            })
    }
    catch(err) {next(err)}
}

const authorization = (req, res, next) => {
    console.log(req.params.id)
    Cart.findOne({where: {id: req.params.id}})
        .then(cart => {
            if(!cart) throw({name: "notFound", message: "Cart not found"})
            if (cart.UserId == req.currentUser.id) {next()}
            else (next({name:'unauthorized'}))
        })
        .catch(err => next(err))
}

const adminAuth = (req, res, next) =>{
    if (req.currentUser.role == "admin") {next()}
    else (next({name: "unauthorized"}))
}

const prodAuth = (req, res, next) => {
    if (req.currentUser.role === "admin") {next()}
    else (
        Product.findOne({where:{id: req.params.id}})
            .then(prod => {
                if (prod.seller_id === req.currentUser.id) {next()}
                else throw ({name: "unauthorized", message: "You may only modify your own products"})
            })
            .catch(err => next(err))
    )
}

const reqAuth = (req, res, next) => {
    if (req.currentUser.role === "admin") {next()}
    else (
        Request.findOne({where:{id: req.params.id}})
            .then(request => {
                if (request.consumer_id === req.currentUser.id) {next()}
                else throw ({name: "unauthorized", message: "You may only modify your own requests"})
            })
            .catch(err => next(err))
    )
}

const bidAuth = (req, res, next) => {
    if (req.currentUser.role === "admin") {next()}
    else (
        Bid.findOne({where:{id: req.params.id}})
            .then(bid => {
                console.log(bid)
                if (bid.consumer_id === req.currentUser.id) {next()}
                else throw ({name: "unauthorized", message: "You may only modify your own requests"})
            })
            .catch(err => next(err))
    )
}

const offAuth = (req, res, next) => {
    if (req.currentUser.role === "admin") {next()}
    else (
        Offer.findOne({where:{id: req.params.id}})
            .then(data => {
                if (data.seller_id === req.currentUser.id) {next()}
                else throw ({name: "unauthorized", message: "You may only modify your own requests"})
            })
            .catch(err => next(err))
    )
}

module.exports = {authentication, adminAuth, bidAuth, prodAuth, reqAuth, offAuth, authorization}