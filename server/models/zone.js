module.exports = (sequelize, DataTypes) => {
  const Zone = sequelize.define('Zone', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    branchId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    country: {
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
