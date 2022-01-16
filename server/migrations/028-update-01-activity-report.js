"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Activities", "activitytypeid", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ActivityTypes",
          key: "id",
        },
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Activities");
  },
};
