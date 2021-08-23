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
    offered_price: DataTypes.INTEGER,
    request_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};