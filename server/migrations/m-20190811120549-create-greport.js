module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Greports', {
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

    gtwelveId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Gtwelves',
        key: 'id'
      }
    },

    newcells: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    totalcells: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    attendance: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    note: {
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

  down: queryInterface => queryInterface.dropTable('Greports')
};
