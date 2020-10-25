module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Attendances', {
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
        model: 'Users',
        key: 'id'
      }
    },

    branchid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Branches',
        key: 'id'
      }
    },

    eventid: {
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

    preacherid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Preachers',
        key: 'id'
      }
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

  down: queryInterface => queryInterface.dropTable('Attendances')
};
