module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    cmf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    cwf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    cyf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    rcf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});

  Group.associate = (models) => {
    const { Branch, User } = models;

    Group.belongsTo(User, {
      foreignKey: 'id',
      as: 'user_group'
    });

    Group.belongsTo(Branch, {
      foreignKey: 'id',
      as: 'groups'
    });
  };

  return Group;
};
