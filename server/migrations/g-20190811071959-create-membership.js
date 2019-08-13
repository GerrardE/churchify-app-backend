module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Memberships', {
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

    adults: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    children: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    tithers: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    newMembers: {
      type: Sequelize.INTEGER,
      allowNull: false,
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

  down: queryInterface => queryInterface.dropTable('Memberships')
};
