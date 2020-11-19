module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },

    role: {
      type: Sequelize.STRING,
      allowNull: true // change to false
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

    branchid: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    state: {
      type: Sequelize.STRING,
      allowNull: true
    },

    country: {
      type: Sequelize.STRING,
      allowNull: true
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
