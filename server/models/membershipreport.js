module.exports = (sequelize, DataTypes) => {
  const Membership = sequelize.define("Membership", {
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

  Membership.associate = (models) => {
    const { Branch, User } = models;

    Membership.belongsTo(User, {
      foreignKey: "userid",
      as: "usermembership"
    });

    Membership.belongsTo(Branch, {
      foreignKey: "branchid",
      as: "branchmembership"
    });
  };
  return Membership;
};
