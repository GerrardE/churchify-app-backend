module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('States', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    country_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Countries',
        key: 'id'
      }
    },
    country_code: {
      type: Sequelize.STRING,
    },
    fips_code: {
      type: Sequelize.STRING,
    },
    iso2: {
      type: Sequelize.STRING,
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

  down: queryInterface => queryInterface.dropTable('States'),
};
