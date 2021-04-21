module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Memberships", {
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

    date: {
      type: Sequelize.DATE,
      allowNull: false
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

    adults: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    children: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    tithers: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    newmembers: {
      type: Sequelize.INTEGER,
      allowNull: false,
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

  down: (queryInterface) => queryInterface.dropTable("Memberships")
};
