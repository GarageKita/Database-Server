const {Request, User} = require('../models/index')
const {Op} = require('sequelize')

module.exports = class Controller {
    static getRequest(req, res, next){
        if(req.params.id){
            Request.findOne({where: {id: req.params.id}, include: [{
                model: User,
                attributes: ['username']
            }, 'Category']})
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
            Request.findAll({include: [{
                model: User,
                attributes: ['username']
            }, 'Category']})
            .then(data => {
                data.forEach(el => {
                    delete el.dataValues.budgetCeil
                })
                if(req.currentUser) {data = data.filter(el => el.consumer_id !== req.currentUser.id)}
                res.status(200).json({message: "success", data})
            })
            .catch(err => next(err))
        }
    }

    static postRequest(req, res, next){
        console.log('inpost')
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
                return Request.findOne({where: {id: req.params.id}, include: [{
                    model: User,
                    attributes: ['username']
                }, 'Category']})     
            })
            .then(data => res.status(200).json({message: "success", data}))
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
        Request.findAll({where:{"consumer_id": req.currentUser.id}, include: [{
            model: User,
            attributes: ['username']
        }, 'Category', 'Offers']})
        .then(data => {
            data.forEach(el => {
                if(el.Offers.some(i => i.offered_price <= el.budgetCeil? el.budgetCeil : el.budget)) {el.dataValues.inBudget = true}
            })
            res.status(200).json({message: "success", data})
        })
        .catch(err => next(err))
    }
    
    static getByCategory(req, res, next){
        Request.findAll({where:{"category_id": req.params.id}, include: [{
            model: User,
            attributes: ['username']
        }, 'Category']})
        .then(data => {
            if(req.currentUser) {data = data.filter(el => el.consumer_id !== req.currentUser.id)}
            res.status(200).json({message: "success", data})
        })
        .catch(err => next(err))
    }

    static searchRequest(req, res, next){
        Request.findAll({where: {name: {[Op.iLike]: `%${req.params.string}%`}}, include: [{
            model: User,
            attributes: ['username']
        }, 'Category']})
        .then(data => {
            if(req.currentUser) {data = data.filter(el => el.consumer_id !== req.currentUser.id)}
            res.status(200).json({message: "success", data})
        })
        .catch(err => next(err))
    }
}
