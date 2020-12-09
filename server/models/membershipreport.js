module.exports = (sequelize, DataTypes) => {
  const Membership = sequelize.define('Membership', {
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },

    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    zoneid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    branchid: {
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

    newmembers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    notes: {
      type: DataTypes.STRING,
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
