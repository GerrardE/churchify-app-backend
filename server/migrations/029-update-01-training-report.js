module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn("Trainings", "trainingtypeid", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "TrainingTypes",
        key: "id",
      },
    }),
  ]),

  down: async (queryInterface) => queryInterface.removeColumn("Trainings", "trainingtypeid"),
};
