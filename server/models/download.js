module.exports = (sequelize, DataTypes) => {
  const Download = sequelize.define('Download', {
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },

    categoryid: {
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
      unique: true,
      allowNull: false
    },

    notes: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});

  Download.associate = (models) => {
    const { User, Category } = models;

    Download.belongsTo(Category, {
      foreignKey: 'id',
      as: 'download'
    });

    Download.belongsTo(User, {
      foreignKey: 'id',
      as: 'downloads'
    });
  };

  return Download;
};
