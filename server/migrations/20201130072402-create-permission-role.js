module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("PermissionRoles", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    roleid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Roles",
        key: "id"
      }
    },
    permissionid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Permissions",
        key: "id"
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable("PermissionRoles"),
};
