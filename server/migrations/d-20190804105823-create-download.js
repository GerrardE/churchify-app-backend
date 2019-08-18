module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Downloads', {
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

    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      }
    },

    month: {
      type: Sequelize.STRING,
      allowNull: true
    },

    year: {
      type: Sequelize.STRING,
      allowNull: true
    },

    url: {
      type: Sequelize.STRING,
      allowNull: false
    },

    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },

    description: {
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

  down: queryInterface => queryInterface.dropTable('Downloads')
};
