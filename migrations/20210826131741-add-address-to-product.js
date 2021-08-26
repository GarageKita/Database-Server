'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Products', 'province_id', Sequelize.INTEGER)
    await queryInterface.addColumn('Products', 'city_id', Sequelize.INTEGER)
    await queryInterface.addColumn('Products', 'weight', Sequelize.INTEGER)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn('Products', 'province_id')
     await queryInterface.removeColumn('Products', 'city_id')
     await queryInterface.removeColumn('Products', 'weight')
  }
};
