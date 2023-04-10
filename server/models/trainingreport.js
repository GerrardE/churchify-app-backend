module.exports = (sequelize, DataTypes) => {
  const Training = sequelize.define("Training", {
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

    trainingtypeid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    converts: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    trainees: {
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

  Training.associate = (models) => {
    const { Branch, User } = models;

    Training.belongsTo(User, {
      foreignKey: "userid",
      as: "usertraining"
    });

    Training.belongsTo(Branch, {
      foreignKey: "branchid",
      as: "branchtraining"
    });
  };
  return Training;
};
