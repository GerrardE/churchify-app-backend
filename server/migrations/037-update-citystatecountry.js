module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn("Cities", "name", { allowNull: false, type: Sequelize.DataTypes.STRING, unique: true }),
    queryInterface.changeColumn("States", "name", { allowNull: false, type: Sequelize.DataTypes.STRING, unique: true }),
    queryInterface.changeColumn("Countries", "name", { allowNull: false, type: Sequelize.DataTypes.STRING, unique: true }),
  ]),

  down: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn("Cities", "name", { type: Sequelize.DataTypes.STRING }),
    queryInterface.changeColumn("States", "name", { type: Sequelize.DataTypes.STRING }),
    queryInterface.changeColumn("Countries", "name", { type: Sequelize.DataTypes.STRING }),
  ]),
};
