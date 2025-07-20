module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ForgotPasswords", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUID,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("NOT_USED", "USED"),
        allowNull: false,
        defaultValue: "NOT_USED",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: (queryInterface) => queryInterface.dropTable("ForgotPasswords"),
};
