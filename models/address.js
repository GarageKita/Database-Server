'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Address.init({
    province_id: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Province cannot be empty"},
        notNull: {msg: "Province cannot be empty"},
      },
      allowNull: false
    },
    city_id: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "City cannot be empty"},
        notNull: {msg: "City cannot be empty"},
      },
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Address cannot be empty"},
        notNull: {msg: "Address cannot be empty"},
      },
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "user_id cannot be empty"},
        notNull: {msg: "user_id cannot be empty"},
      },
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};