module.exports = (sequelize, DataTypes) => {
  const Training = sequelize.define('Training', {
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
    },

    notes: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Training.associate = (models) => {
    const { Branch, User } = models;

    Training.belongsTo(User, {
      foreignKey: 'id',
      as: 'user_trainings'
    });

    Training.belongsTo(Branch, {
      foreignKey: 'id',
      as: 'training'
    });
  };
  return Training;
};
