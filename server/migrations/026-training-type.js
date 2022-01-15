"use strict";
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("TrainingTypes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      userid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },

      branchid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Branches",
          key: "id",
        },
      },

      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      notes: {
        type: Sequelize.STRING,
        allowNull: false,
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

  down: (queryInterface) => queryInterface.dropTable("TrainingTypes"),
};
