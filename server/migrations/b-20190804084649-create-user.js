module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },

    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },

    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },

    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },

    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
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

    state: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'States',
        key: 'id'
      }
    },

    country: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Countries',
        key: 'id'
      }
    },

    password: {
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

  down: queryInterface => queryInterface.dropTable('Users')
};
