module.exports = (sequelize, DataTypes) => {
  const Mit = sequelize.define('Mit', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    converts: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    trainees: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  Mit.associate = (models) => {
    const { Branch, User } = models;

    Mit.belongsTo(User, {
      foreignKey: 'id',
      as: 'user_mits'
    });

    Mit.belongsTo(Branch, {
      foreignKey: 'id',
      as: 'mit'
    });
  };
  return Mit;
};
