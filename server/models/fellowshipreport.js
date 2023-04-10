module.exports = (sequelize, DataTypes) => {
  const Freport = sequelize.define("Freport", {
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

    fellowshipid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    newcells: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    totalcells: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    attendance: {
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

  Freport.associate = (models) => {
    const { Fellowship, User, Branch } = models;

    Freport.belongsTo(User, {
      foreignKey: "userid",
      as: "userfreport"
    });

    Freport.belongsTo(Fellowship, {
      foreignKey: "id",
      as: "freport"
    });

    Freport.belongsTo(Branch, {
      foreignKey: "branchid",
      as: "branchfreport"
    });
  };

  return Freport;
};
