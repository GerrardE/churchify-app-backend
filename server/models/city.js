module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define("City", {
    name: DataTypes.STRING,
    state_id: DataTypes.INTEGER,
    state_code: DataTypes.STRING,
    country_id: DataTypes.INTEGER,
    country_code: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    flag: DataTypes.INTEGER,
    wikiDataId: DataTypes.STRING
  }, {});

  City.associate = (models) => {
    const {
      Country, State
    } = models;

    City.belongsTo(Country, {
      foreignKey: "id",
      as: "cities_country"
    });

    City.belongsTo(State, {
      foreignKey: "id",
      as: "cities_state"
    });
  };
  return City;
};
