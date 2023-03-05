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
    pastorpaid: { type: DataTypes.BOOLEAN, },
    fulltimepastorcount: { type: DataTypes.INTEGER },
    uploads: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Remuneration.associate = (models) => {
    const {
      Finance, User
    } = models;

    Remuneration.belongsTo(Finance, {
      foreignKey: "id",
      as: "remunerations"
    });

    Remuneration.belongsTo(User, {
      foreignKey: "id",
      as: "user_remunerations"
    });
  };

  return Remuneration;
};
