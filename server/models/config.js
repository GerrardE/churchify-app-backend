module.exports = (sequelize, DataTypes) => {
  const Config = sequelize.define('Config', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    config: DataTypes.ARRAY(DataTypes.JSON),
  }, {});
  Config.associate = () => {};
  return Config;
};
