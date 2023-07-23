module.exports = (sequelize, DataTypes) => {
  const Download = sequelize.define("Download", {
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },

    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false
    },

    buffer: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
      get() {
        return this.getDataValue("buffer")
          .toString("base64");
      }
    },

    originalname: { type: DataTypes.STRING, allowNull: false },
    mimetype: { type: DataTypes.STRING, allowNull: false },

    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    notes: {
      type: DataTypes.STRING,
    },
  }, {});

  Download.associate = (models) => {
    const { User, Category } = models;

    Download.belongsTo(Category, {
      foreignKey: "id",
      as: "download"
    });

    Download.belongsTo(User, {
      foreignKey: "id",
      as: "downloads"
    });
  };

  return Download;
};
