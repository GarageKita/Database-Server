'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'consumer_id'})
      this.belongsTo(models.Product, {foreignKey: 'product_id'})
    }
  };
  Bid.init({
    offered_price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "offered price cannot be empty"},
        notNull: {msg: "offered price cannot be empty"},
        min: {args: [0], msg: "cannot offer for less than zero"}
      },
      allowNull: false
    },
    consumer_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "consumer id cannot be empty"},
        notNull: {msg: "consumer id cannot be empty"},
      },
      allowNull: false
    },
    qty: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "please specify the amount of items"},
        notNull: {msg: "is null"},
        min: {args: [0], msg: "please specify the amount of items"}
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
    modelName: 'Bid',
  });
  return Bid;
};