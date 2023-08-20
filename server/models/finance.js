module.exports = (sequelize, DataTypes) => {
  const Finance = sequelize.define("Finance", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    zoneid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    branchid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    preacherid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    userid: { // reporter
      type: DataTypes.UUID,
      allowNull: false,
    },

    notes: {
      type: DataTypes.STRING,
    },

    createdAt: {
      type: DataTypes.DATE,
      get() {
        const createdAt = this.getDataValue("createdAt") || "";
        return createdAt.toLocaleString("en-GB", { timeZone: "UTC" });
      }
    },
  }, {});

  Finance.associate = (models) => {
    const {
      Branch, Zone, User, Asset, Remuneration, Payment, Receipt
    } = models;

    Finance.belongsTo(Branch, {
      foreignKey: "id",
      as: "branch_finances"
    });

    Finance.belongsTo(Zone, {
      foreignKey: "id",
      as: "zone_finances"
    });

    Finance.belongsTo(User, {
      foreignKey: "userid",
      as: "user_finances"
    });

    Finance.hasMany(Asset, {
      foreignKey: "id",
      as: "assets"
    });

    Finance.hasMany(Remuneration, {
      foreignKey: "id",
      as: "remunerations"
    });

    Finance.hasMany(Payment, {
      foreignKey: "id",
      as: "payments"
    });

    Finance.hasMany(Receipt, {
      foreignKey: "id",
      as: "receipts"
    });
  };

  return Finance;
};
