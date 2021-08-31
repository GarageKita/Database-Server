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
        Bid.findOne({where:{id: req.params.id}, include: Product})
            .then(bid => {
                console.log(bid.Product)
                if (bid.consumer_id === req.currentUser.id) {next()}
                else if (bid.Product.dataValues.seller_id === req.currentUser.id) {next()}
                else throw ({name: "unauthorized", message: "You may only modify your own bids"})
            })
            .catch(err => next(err))
    )
}

const offAuth = (req, res, next) => {
    if (req.currentUser.role === "admin") {next()}
    else (
        Offer.findOne({where:{id: req.params.id}, include: Request})
            .then(data => {
                if (data.seller_id === req.currentUser.id) {next()}
                else if (data.Request.dataValues.consumer_id === req.currentUser.id) {next()}
                else throw ({name: "unauthorized", message: "You may only modify your own offers"})
            })
            .catch(err => next(err))
    )
}

const userAuth = (req, res, next) => {
    if (req.currentUser.role === "admin") {next()}
    else (
        User.findOne({where:{id: req.params.id}})
            .then(user => {
                if (user.id === req.currentUser.id) {next()}
                else throw ({name: "unauthorized", message: "You may only modify your own profile"})
            })
            .catch(err => next(err))
    )
}

const condAuth = (req, res, next) => {
    if(req.headers.access_token) {authentication(req, res, next)}
    else {next()}
}

module.exports = {authentication, adminAuth, bidAuth, prodAuth, reqAuth, offAuth, userAuth, condAuth}