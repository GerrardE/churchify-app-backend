module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    name: DataTypes.STRING,
    iso3: DataTypes.STRING,
    iso2: DataTypes.STRING,
    phonecode: DataTypes.STRING,
    capital: DataTypes.STRING,
    currency: DataTypes.STRING,
    native: DataTypes.STRING,
    region: DataTypes.STRING,
    subregion: DataTypes.STRING,
    emoji: DataTypes.STRING,
    emojiU: DataTypes.STRING,
    flag: DataTypes.INTEGER,
    wikiDataId: DataTypes.STRING
  }, {});

  Country.associate = (models) => {
    const {
      State, City
    } = models;

    Country.hasMany(City, {
      foreignKey: 'id',
      as: 'country_cities'
    });

    Country.hasMany(State, {
      foreignKey: 'id',
      as: 'country_states'
    });
  };

  return Country;
};
