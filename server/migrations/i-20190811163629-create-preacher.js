module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Preachers', {
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
      allowNull: false,
      references: {
        model: 'Branches',
        key: 'id'
      }
    },

    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },

    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },

    address: {
      type: Sequelize.STRING,
      allowNull: false
    },

    city: {
      type: Sequelize.STRING,
      allowNull: false
    },

    state: {
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

  down: queryInterface => queryInterface.dropTable('Preachers')
};