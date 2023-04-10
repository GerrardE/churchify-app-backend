module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Finances", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    zoneid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Zones",
        key: "id"
      }
    },
    branchid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Branches",
        key: "id"
      }
    },
    preacherid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Preachers",
        key: "id"
      }
    },
    userid: { // reporter
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
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

  down: (queryInterface) => queryInterface.dropTable("Finances"),
};
