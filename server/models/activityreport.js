module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
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
