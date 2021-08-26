const {User} = require('../models/index')
const {compare} = require('../helpers/bcrypt')
const {jwtDecrypt, jwtEncrypt} = require('../helpers/jwt')

class Controller{
    static login(req, res, next){
        if (!req.body.email || !req.body.password) throw ({name:badRequest, message:"No username or password"})
        User.findOne({where: {email: req.body.email}})
            .then(user => {
                if(!user) {throw {name: "notFound"}}
                else if (!user.isActivated) {throw {name:"unauthorized", message:"this account has not been activated"}}
                else if(compare(req.body.password, user.password)) {
                    const token = jwtEncrypt({id: user.id})
                    res.status(200).json({message: "Login successful", access_token: token}) 
                } else {throw {name: "unauthorized", message:"Wrong password"}}
            })
            .catch(error => {
                next(error)
            })
    }
    
    static register(req, res, next){
        if (!req.body.email || !req.body.password) throw ({name:badRequest, message:"No username or password"})
        User.create(req.body)
            .then(() => {
                console.log('created')
                res.status(201).json({message: "registration success"})
            })
            .catch(error => {
                next(error)
            })
    }

    static putUser(req, res, next) {
        User.update(req.body, {where: {id: req.params.id}})
            .then(() => res.status(200).json({message: 'success'}))
            .catch(error => next(error))
    }
}

module.exports = Controller