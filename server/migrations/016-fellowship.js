module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Fellowships", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    userid: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "Users",
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

    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },

    address: {
      type: Sequelize.STRING,
      allowNull: false
    },

    city: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Cities",
        key: "id"
      }
    },

    state: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "States",
        key: "id"
      }
    },

    country: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Countries",
        key: "id"
      }
    },

    notes: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },

    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),

  down: (queryInterface) => queryInterface.dropTable("Fellowships")
};
