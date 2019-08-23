module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Attendances', {
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

    eventId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'id'
      }
    },

    women: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    men: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    children: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    preacherId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Preachers',
        key: 'id'
      }
    },

    notes: {
      type: Sequelize.STRING,
      allowNull: true,
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

  down: queryInterface => queryInterface.dropTable('Attendances')
};
