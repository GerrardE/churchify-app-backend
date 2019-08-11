module.exports = (sequelize, DataTypes) => {
  const Download = sequelize.define('Download', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    month: {
      type: DataTypes.STRING,
      allowNull: true
    },

    year: {
      type: DataTypes.STRING,
      allowNull: true
    },

    url: {
      type: DataTypes.STRING,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});

  Download.associate = (models) => {
    const { User, Category } = models;

    Download.belongsTo(Category, {
      foreignKey: 'id',
      as: 'downloads'
    });

    Download.belongsTo(User, {
      foreignKey: 'id',
      as: 'downloads'
    });
  };

  return Download;
};
