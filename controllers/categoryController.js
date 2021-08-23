const {Category, CategoryList, Product} = require('../models/index')

class Controller{
    static postCategory(req, res, next){
        Category.create(req.body)
        .then(data => {
            res.status(201).json({message: "success", data})
        })
        .catch(err => next(err))
    }

    static putCategory(req, res, next){
        Category.update(req.body, {
            where: {id: req.params.id}, 
            returning: true
        })
            .then((data) => {
                if(data[0] == 0) throw {name: "notFound", message: "Category not found"}
                res.status(200).json({message: "success", data: data[1][0]})
            })
            .catch(err => next(err))
    }

    static delCategory(req, res, next){
        Category.destroy({where: {id: req.params.id}, returning: true})
            .then(re => {
                if(re == 0) throw {name: "notFound", message: "Category not found"}
                res.status(200).json({message: "success"})
            })
            .catch(err => next(err))
    }

    static getCategory(req, res, next){
        Category.findAll()
            .then(data => {
                res.status(200).json({message: "success", data})
            })
            .catch(err => next(err))
    }
}

module.exports= Controller