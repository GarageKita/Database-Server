'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        notNull: true
      },
      image_url: {
        type: Sequelize.STRING,
        notNull: true
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER,
        notNull: true
      },
      priceFloor:{
        type: Sequelize.INTEGER
      },
      stock: {
        type: Sequelize.INTEGER,
        notNull: true
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};