module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define("State", {
    name: DataTypes.STRING,
    country_id: DataTypes.INTEGER,
    country_code: DataTypes.STRING,
    fips_code: DataTypes.STRING,
    iso2: DataTypes.STRING,
    flag: DataTypes.INTEGER,
    wikiDataId: DataTypes.STRING
  }, {});

  State.associate = (models) => {
    const { City, Country } = models;

    State.hasMany(City, {
      foreignKey: "id",
      as: "state_cities"
    });

    State.belongsTo(Country, {
      foreignKey: "id",
      as: "states"
    });
  };

  return State;
};
