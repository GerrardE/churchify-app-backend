module.exports = (sequelize, DataTypes) => {
  const Zone = sequelize.define('Zone', {
    userid: {
      type: DataTypes.UUID,
      allowNull: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false
    },

    notes: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Zone.associate = (models) => {
    const {
      Branch
    } = models;

    Zone.hasMany(Branch, {
      foreignKey: 'id',
      as: 'branches'
    });
  };

  return Zone;
};
