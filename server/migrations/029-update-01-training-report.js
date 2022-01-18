"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Trainings", "trainingtypeid", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TrainingTypes",
          key: "id",
        },
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Trainings");
  },
};
