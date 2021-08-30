'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'consumer_id'})
      this.belongsTo(models.Category, {foreignKey: 'category_id'})
      this.hasMany(models.Offer, {foreignKey: 'request_id'})
    }
  };
  Request.init({
    name:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "name cannot be empty"},
        notNull: {msg: "name cannot be empty"},
      },
      allowNull: false
    },
    budget: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "budget cannot be empty"},
        notNull: {msg: "budget cannot be empty"},
        min: {args: [0], msg: "budget cannot be less than zero"}
      },
      allowNull: false
    },
    budgetCeil: DataTypes.INTEGER,
    description: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    consumer_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "consumer id cannot be empty"},
        notNull: {msg: "consumer id cannot be empty"},
      },
      allowNull: false
    },
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Request',
    hooks: {
      beforeCreate: product => {
        if(!product.qty) product.qty = 1
      }
    }
  });
  return Request;
};