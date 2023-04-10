module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      notes: {
        type: DataTypes.STRING,
      },
    },
    {}
  );

  Role.associate = (models) => {
    const { Permission, User } = models;

    Role.belongsToMany(Permission, {
      through: "PermissionRole",
      as: "permissions",
      foreignKey: "roleid",
    });

    Role.belongsToMany(User, {
      through: "UserRole",
      as: "users",
      foreignKey: "roleid"
    });
  };
  return Role;
};
