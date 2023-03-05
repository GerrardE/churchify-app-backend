module.exports = {
  // Capital expenses/fixed assets
  up: (queryInterface, Sequelize) => queryInterface.createTable("Assets", {
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
    building: { type: Sequelize.INTEGER, allowNull: false },
    motorvehicle: { type: Sequelize.INTEGER, allowNull: false },
    generator: { type: Sequelize.INTEGER, allowNull: false },
    musicaleqpt: { type: Sequelize.INTEGER, allowNull: false },
    asabaproject: { type: Sequelize.INTEGER, allowNull: false },
    others: { type: Sequelize.INTEGER, allowNull: false },
    uploads: {
      type: Sequelize.ARRAY(Sequelize.JSONB),
      allowNull: false
    },
    notes: {
      type: Sequelize.STRING,
      allowNull: false
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

  down: (queryInterface) => queryInterface.dropTable("Assets"),
};
