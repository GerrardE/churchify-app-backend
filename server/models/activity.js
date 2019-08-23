module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    council: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    special: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    project: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    notes: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});

  Activity.associate = (models) => {
    const {
      User, Branch
    } = models;

    Activity.belongsTo(User, {
      foreignKey: 'id',
      as: 'activity'
    });

    Activity.belongsTo(Branch, {
      foreignKey: 'id',
      as: 'branchActivity'
    });
  };

  return Activity;
};
