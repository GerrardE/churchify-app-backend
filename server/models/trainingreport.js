module.exports = (sequelize, DataTypes) => {
  const Training = sequelize.define('Training', {
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },

    day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    zoneid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    branchid: {
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
