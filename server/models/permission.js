module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    "Permission",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {}
  );

  Permission.associate = (models) => {
    const { Role } = models;

    Permission.belongsToMany(Role, {
      through: "PermissionRole",
      as: "roles",
      foreignKey: "permissionid"
    });
  };
  return Permission;
};
