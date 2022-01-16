"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Groups", "gymcf", { type: Sequelize.INTEGER, allowNull: false }),
      queryInterface.addColumn("Groups", "ywcf", { type: Sequelize.INTEGER, allowNull: false }),
      queryInterface.addColumn("Groups", "yaf", { type: Sequelize.INTEGER, allowNull: false }),
      queryInterface.addColumn("Groups", "teens", { type: Sequelize.INTEGER, allowNull: false }),
      queryInterface.removeColumn("Groups", "cyf", Sequelize.INTEGER),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Groups");
  },
};
