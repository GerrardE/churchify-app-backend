module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
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

    cmf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    cwf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    gymcf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    ywcf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    yaf: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    teens: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    rcf: {
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

  Group.associate = (models) => {
    const { Branch, User } = models;

    Group.belongsTo(User, {
      foreignKey: "userid",
      as: "usergroup"
    });

    Group.belongsTo(Branch, {
      foreignKey: "branchid",
      as: "branchgroup"
    });
  };

  return Group;
};
