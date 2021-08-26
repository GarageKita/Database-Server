const {Address} = require('../models/index')

class Controller {
    static postAddress(req, res, next) {
        const newAddress = req.body
        newAddress.user_id = req.currentUser.id
        Address.create(newAddress, {returning: true})
            .then(data => res.status(201).json({message: "success", data}))
            .catch(err => next(err))
    }
    static putAddress(req, res, next){
        Address.update(req.body,{where: {id: req.params.id}, returning:true})
            .then((data) => {
                if(data[0] == 0) throw {name: "notFound", message: "Address not found"}
                res.status(200).json({message: "success", data: data[1][0]})
            })
            .catch(err => next(err))
                .catch(err => next(err))
    }
    static getMyAddress(req, res, next){
        Address.findAll({where: {user_id: req.currentUser.id}})
        .then(data => res.status(200).json({message: "success", data}))
        .catch(err => next(err))
    }
    static delAddress(req, res, next){
        Address.destroy({where: {id: req.params.id}})
        .then(re => {
            if(re == 0) throw {name: "notFound", message: "Address not found"}
            res.status(200).json({message: "success"})
        })
        .catch(err => next(err))
    }
}

module.exports = Controller