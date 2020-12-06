module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Groups', {
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

    zoneid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Zones',
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

    cmf: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    cwf: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    cyf: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    rcf: {
      type: Sequelize.INTEGER,
      allowNull: false
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

  down: queryInterface => queryInterface.dropTable('Groups')
};
