module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Cities", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    state_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "States",
        key: "id"
      }
    },
    state_code: {
      type: Sequelize.STRING,
    },
    country_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Countries",
        key: "id"
      }
    },
    country_code: {
      type: Sequelize.STRING,
    },
    latitude: {
      type: Sequelize.DECIMAL,
    },
    longitude: {
      type: Sequelize.DECIMAL,
    },
    flag: {
      type: Sequelize.INTEGER,
    },
    wikiDataId: {
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
  down: (queryInterface) => queryInterface.dropTable("Cities"),
};
