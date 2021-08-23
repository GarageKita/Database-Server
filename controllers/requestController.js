const {Request} = require('../models/index')

module.exports = class Controller {
    static getRequest(req, res, next){
        if(req.params.id){
            Request.findOne({where: {id: req.params.id}})
            .then(data => {
                if(req.currentUser){
                    if(data.id === req.currentUser.id){
                        res.status(200).json({message: "sucsess", data})
                    }
                    else {
                        delete data.budgetCeil
                        res.status(200).json({message:"success", data})
                    }
                }
                else {
                    delete data.budgetCeil
                    res.status(200).json({message:"success", data})
                }
            })
            .catch(err => next(err))
        }
        else {
            Request.findAll()
            .then(data => {
                data.forEach(el => {
                    delete el.dataValues.budgetCeil
                })
                res.status(200).json({message: "success", data})
            })
            .catch(err => next(err))
        }
    }

    static postRequest(req, res, next){
        let newRequest = req.body
        if (!newRequest.qty) newRequest.qty = 1
        newRequest.consumer_id = req.currentUser.id
        Request.create(newRequest, {returning:true})
            .then(data => res.status(200).json({message: 'success', data}))
            .catch(err => next(err))
    }

    static putRequest(req, res, next){
        Request.update(req.body, {where: {id:req.params.id}, returning: true})
            .then((data) => {
                if(data[0] == 0) throw({name: "notFound", message: "request not found" })
                res.status(200).json({message: "success", data: data[1][0]})
            })
            .catch(err => next(err))
    }

    static delRequest(req, res, next){
        Request.destroy({where:{id: req.params.id}})
            .then((data) => {
                if(data == 0) throw({name: "notFound", message: "request not found"})
                console.log("data deleted")
                res.status(200).json({message: "success"})
            })
            .catch(err => next(err))
    }

    static getMyRequest(req, res, next){
        Request.findAll({where: {id: req.currentUser.id}})
        .then(data => res.status(200).json({message: "success", data}))
        .catch(err => next(err))
    }
}
