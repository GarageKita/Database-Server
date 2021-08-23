const {jwtDecrypt} = require("../helpers/jwt")
const {User, Cart} = require('../models/index.js')

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

module.exports = {authentication, adminAuth, authorization}