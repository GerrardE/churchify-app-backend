module.exports = (sequelize, DataTypes) => {
  // Capital expenses/fixed assets
  const Asset = sequelize.define("Asset", {
    userid: { // reporter
      type: DataTypes.UUID,
      allowNull: false,
    },
    financeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    building: { type: DataTypes.INTEGER, allowNull: false },
    motorvehicle: { type: DataTypes.INTEGER, allowNull: false },
    generator: { type: DataTypes.INTEGER, allowNull: false },
    musicaleqpt: { type: DataTypes.INTEGER, allowNull: false },
    asabaproject: { type: DataTypes.INTEGER, allowNull: false },
    others: { type: DataTypes.INTEGER, allowNull: false },
    uploads: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Asset.associate = (models) => {
    const {
      Finance, User
    } = models;

    Asset.belongsTo(Finance, {
      foreignKey: "id",
      as: "assets"
    });

    Asset.belongsTo(User, {
      foreignKey: "id",
      as: "user_assets"
    });
  };

  return Asset;
};
