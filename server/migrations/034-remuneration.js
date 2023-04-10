module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Remunerations", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    userid: { // reporter
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    financeid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Finances",
        key: "id"
      }
    },
    pastorpayed: { type: Sequelize.BOOLEAN, },
    fulltimepastorcount: { type: Sequelize.INTEGER },
    uploads: {
      type: Sequelize.ARRAY(Sequelize.JSONB),
      allowNull: false
    },
    notes: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable("Remunerations"),
};
