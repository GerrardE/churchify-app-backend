module.exports = (sequelize, DataTypes) => {
  const ActivityType = sequelize.define("ActivityType", {
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },

    branchid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    notes: {
      type: DataTypes.STRING,
    },
  }, {});

  ActivityType.associate = (models) => {
    const { Branch } = models;

    ActivityType.belongsTo(Branch, {
      foreignKey: "id",
      as: "activitytype"
    });
  };

  return ActivityType;
};
