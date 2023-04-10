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
    }
  }, {});

  Finance.associate = (models) => {
    const {
      Branch, Zone, User
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
      foreignKey: "id",
      as: "user_finances"
    });
  };

  return Finance;
};
