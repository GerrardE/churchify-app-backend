module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      userid: {
        type: DataTypes.UUID,
        allowNull: false
      },
      roleid: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {}
  );

  UserRole.associate = (models) => {
    const { Role, User } = models;

    UserRole.belongsTo(Role, {
      foreignKey: "roleid"
    });

    UserRole.belongsTo(User, {
      foreignKey: "userid"
    });
  };

  return UserRole;
};
