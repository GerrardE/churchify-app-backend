module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define("Activity", {
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return this.getDataValue("date")
          .toLocaleDateString("en-GB", { timeZone: "UTC" });
      }
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

    createdAt: {
      type: DataTypes.DATE,
      get() {
        return this.getDataValue("createdAt")
          .toLocaleString("en-GB", { timeZone: "UTC" });
      }
    },

    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return this.getDataValue("updatedAt")
          .toLocaleString("en-GB", { timeZone: "UTC" });
      }
    }
  }, {});

  Activity.associate = (models) => {
    const {
      User, Branch
    } = models;

    Activity.belongsTo(User, {
      foreignKey: "userid",
      as: "useractivity"
    });

    Activity.belongsTo(Branch, {
      foreignKey: "branchid",
      as: "branchactivity"
    });
  };

  return Activity;
};
