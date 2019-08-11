module.exports = (sequelize, DataTypes) => {
  const Membership = sequelize.define('Membership', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    adults: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    children: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    tithers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    newMembers: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  Membership.associate = (models) => {
    const { Branch, User } = models;

    Membership.belongsTo(User, {
      foreignKey: 'id',
      as: 'user_memberships'
    });

    Membership.belongsTo(Branch, {
      foreignKey: 'id',
      as: 'membership'
    });
  };
  return Membership;
};
