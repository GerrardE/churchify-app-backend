module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Countries', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    iso3: {
      type: Sequelize.STRING,
    },
    iso2: {
      type: Sequelize.STRING,
    },
    phonecode: {
      type: Sequelize.STRING,
    },
    capital: {
      type: Sequelize.STRING,
    },
    currency: {
      type: Sequelize.STRING,
    },
    native: {
      type: Sequelize.STRING,
    },
    region: {
      type: Sequelize.STRING,
    },
    subregion: {
      type: Sequelize.STRING,
    },
    emoji: {
      type: Sequelize.STRING,
    },
    emojiU: {
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

  down: queryInterface => queryInterface.dropTable('Countries'),
};
