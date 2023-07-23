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
    buffer: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
      get() {
        return this.getDataValue("buffer").toString("base64");
      }
    },
    originalname: { type: DataTypes.STRING, allowNull: false },
    mimetype: { type: DataTypes.STRING, allowNull: false },
    notes: { type: DataTypes.STRING }
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
