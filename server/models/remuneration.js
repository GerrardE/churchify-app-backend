module.exports = (sequelize, DataTypes) => {
  const Remuneration = sequelize.define("Remuneration", {
    userid: { // reporter
      type: DataTypes.UUID,
      allowNull: false,
    },
    financeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pastorpayed: {
      type: DataTypes.STRING,
    },
    fulltimepastorcount: { type: DataTypes.INTEGER },
    buffer: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
      get() {
        return this.getDataValue("buffer")
          .toString("base64");
      }
    },
    originalname: { type: DataTypes.STRING, allowNull: false },
    mimetype: { type: DataTypes.STRING, allowNull: false },
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

  Remuneration.associate = (models) => {
    const {
      Finance, User
    } = models;

    Remuneration.belongsTo(Finance, {
      foreignKey: "financeid",
      as: "finance_remunerations"
    });

    Remuneration.belongsTo(User, {
      foreignKey: "userid",
      as: "user_remunerations"
    });
  };

  return Remuneration;
};
