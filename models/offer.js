'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association 
      this.belongsTo(models.User, {foreignKey: 'seller_id'})
      this.belongsTo(models.Request, {foreignKey: 'request_id'})
      this.belongsTo(models.Product, {foreignKey: 'product_id'})
    }
  };
  Offer.init({
    offered_price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "offered price cannot be empty"},
        notNull: {msg: "offered price cannot be empty"},
        min: {args: [0], msg: "cannot offer for less than zero"}
      },
      allowNull: false
    },
    request_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "request id cannot be empty"},
        notNull: {msg: "request id cannot be empty"},
      },
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "product id cannot be empty"},
        notNull: {msg: "product id cannot be empty"},
      },
      allowNull: false
    },
    seller_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "seller id cannot be empty"},
        notNull: {msg: "seller id cannot be empty"},
      },
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "status cannot be empty"},
        notNull: {msg: "status cannot be empty"},
      },
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};