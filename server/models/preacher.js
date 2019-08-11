module.exports = (sequelize, DataTypes) => {
  const Preacher = sequelize.define('Preacher', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false
    },

    city: {
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

  Preacher.associate = (models) => {
    const {
      Branch, User
    } = models;

    Preacher.belongsTo(User, {
      foreignKey: 'id',
      as: 'preachers'
    });

    Preacher.belongsTo(Branch, {
      foreignKey: 'id',
      as: 'preacher'
    });
  };
  return Preacher;
};
