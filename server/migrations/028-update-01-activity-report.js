module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn("Activities", "activitytypeid", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "ActivityTypes",
        key: "id",
      },
    }),
  ]),

  down: async (queryInterface) => queryInterface.removeColumn("Activities", "activitytypeid"),
};
