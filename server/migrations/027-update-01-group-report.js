module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn("Groups", "gymcf", { type: Sequelize.INTEGER, allowNull: false }),
    queryInterface.addColumn("Groups", "ywcf", { type: Sequelize.INTEGER, allowNull: false }),
    queryInterface.addColumn("Groups", "yaf", { type: Sequelize.INTEGER, allowNull: false }),
    queryInterface.addColumn("Groups", "teens", { type: Sequelize.INTEGER, allowNull: false }),
    queryInterface.removeColumn("Groups", "cyf", Sequelize.INTEGER),
  ]),

  down: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn("Groups", "gymcf"),
    queryInterface.removeColumn("Groups", "ywcf"),
    queryInterface.removeColumn("Groups", "yaf"),
    queryInterface.removeColumn("Groups", "teens"),
    queryInterface.addColumn("Groups", "cyf", Sequelize.INTEGER),
  ]),
};
