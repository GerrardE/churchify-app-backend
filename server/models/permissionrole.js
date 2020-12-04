module.exports = (sequelize, DataTypes) => {
  const PermissionRole = sequelize.define(
    'PermissionRole',
    {
      roleid: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      permissionid: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {}
  );

  PermissionRole.associate = (models) => {
    const { Role, Permission } = models;

    PermissionRole.belongsTo(Role, {
      foreignKey: 'roleid'
    });

    PermissionRole.belongsTo(Permission, {
      foreignKey: 'permissionid'
    });
  };

  return PermissionRole;
};
