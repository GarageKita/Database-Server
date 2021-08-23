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
    offered_price: DataTypes.INTEGER,
    consumer_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bid',
  });
  return Bid;
};