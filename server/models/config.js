module.exports = (sequelize, DataTypes) => {
  const Config = sequelize.define('Config', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    type: DataTypes.STRING,
    config: DataTypes.ARRAY(DataTypes.JSON),
  }, {});
  Config.associate = () => {};
  return Config;
};
