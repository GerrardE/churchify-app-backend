module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Branches', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    userId: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },

    zoneId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Zones',
        key: 'id'
      }
    },

    country: {
      type: Sequelize.STRING,
      allowNull: false
    },

    city: {
      type: Sequelize.STRING,
      allowNull: false
    },

    address: {
      type: Sequelize.STRING,
      allowNull: false
    },

    state: {
      type: Sequelize.STRING,
      allowNull: false
    },

    name: {
      type: Sequelize.STRING,
      unique: true,
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

  down: queryInterface => queryInterface.dropTable('Branches')
};
