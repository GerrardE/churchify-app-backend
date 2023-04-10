module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define("Activity", {
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },

    date: {
      type: DataTypes.DATE,
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

    activitytypeid: {
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
    },
  }, {});

  Activity.associate = (models) => {
    const {
      User, Branch
    } = models;

    Activity.belongsTo(User, {
      foreignKey: "id",
      as: "activity"
    });

    Activity.belongsTo(Branch, {
      foreignKey: "id",
      as: "branchActivity"
    });
  };

  return Activity;
};
