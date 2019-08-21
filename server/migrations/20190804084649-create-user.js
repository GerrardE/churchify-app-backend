module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },

    role: {
      type: Sequelize.INTEGER,
      allowNull: true // change to false
    },

    firstName: {
      type: Sequelize.CITEXT,
      allowNull: false
    },

    lastName: {
      type: Sequelize.CITEXT,
      allowNull: false
    },

    phone: {
      type: Sequelize.STRING,
      allowNull: true
    },

    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },

    branchId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    country: {
      type: Sequelize.CITEXT,
      allowNull: false
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
