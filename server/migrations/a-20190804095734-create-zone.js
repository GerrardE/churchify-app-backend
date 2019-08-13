module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Zones', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },

    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },

    country: {
      type: Sequelize.STRING,
      allowNull: false
    },

    description: {
      type: Sequelize.STRING,
      allowNull: false
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

  down: queryInterface => queryInterface.dropTable('Zones')
};
