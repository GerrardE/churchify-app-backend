module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn("Downloads", "buffer", { type: Sequelize.BLOB("long"), allowNull: false }),
    queryInterface.addColumn("Downloads", "originalname", { type: Sequelize.STRING, allowNull: false }),
    queryInterface.addColumn("Downloads", "mimetype", { type: Sequelize.STRING, allowNull: false }),
    queryInterface.removeColumn("Downloads", "url"),
  ]),

  down: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn("Downloads", "buffer"),
    queryInterface.removeColumn("Downloads", "originalname"),
    queryInterface.removeColumn("Downloads", "mimetype"),
    queryInterface.addColumn("Downloads", "url", Sequelize.STRING),
  ]),
};
