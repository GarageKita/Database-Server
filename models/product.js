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
      this.hasMany(models.Bid, {foreignKey: 'product_id'})
    }
  };
  Product.init({
    name:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "name cannot be empty"},
        notNull: {msg: "name cannot be empty"},
      },
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "products must have image"},
        notNull: {msg: "products must have image"},
        isUrl: {msg: "please provide a valid url"}
      },
      allowNull: false
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "price cannot be empty"},
        notNull: {msg: "price cannot be empty"},
        min: {args: [0], msg: "price cannot be less than zero"}
      },
      allowNull: false
    },
    priceFloor: DataTypes.INTEGER,
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "stock cannot be empty"},
        notNull: {msg: "stock cannot be empty"},
        min: {args: [0], msg: "stock cannot be less than zero"}
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
    category_id: DataTypes.INTEGER,
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
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {msg: "weight cannot be empty"},
        notNull: {msg: "weight cannot be empty"},
        min: {args: [1], msg: "weight cannot be less than one"}
      },
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};