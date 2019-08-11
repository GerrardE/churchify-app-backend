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

    branchId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Branches',
        key: 'id'
      }
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    country: {
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
