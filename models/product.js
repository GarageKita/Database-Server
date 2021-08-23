'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'seller_id'})
      this.belongsTo(models.Category, {foreignKey: 'category_id'})
    }
  };
  Product.init({
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    priceFloor: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};