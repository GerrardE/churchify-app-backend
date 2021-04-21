module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Downloads", {
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

    categoryid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id"
      }
    },

    date: {
      type: Sequelize.DATE,
      allowNull: false
    },

    url: {
      type: Sequelize.STRING,
      allowNull: false
    },

    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
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

  down: (queryInterface) => queryInterface.dropTable("Downloads")
};
