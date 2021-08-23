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
    }
  };
  Request.init({
    name: DataTypes.STRING,
    budget: DataTypes.INTEGER,
    budgetCeil: DataTypes.INTEGER,
    description: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    consumer_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};