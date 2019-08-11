module.exports = (sequelize, DataTypes) => {
  const Gtwelve = sequelize.define('Gtwelve', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});

  Gtwelve.associate = (models) => {
    const { Branch, User } = models;

    Gtwelve.belongsTo(Branch, {
      foreignKey: 'id',
      as: 'gtwelves'
    });

    Gtwelve.belongsTo(User, {
      foreignKey: 'id',
      as: 'user_gtwelve'
    });
  };

  return Gtwelve;
};
