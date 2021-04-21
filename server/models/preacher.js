module.exports = (sequelize, DataTypes) => {
  const Preacher = sequelize.define("Preacher", {
    userid: {
      type: DataTypes.UUID,
      allowNull: false
    },

    branchid: {
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

    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false
    },

    city: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    country: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    notes: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});

  Preacher.associate = (models) => {
    const {
      Branch, User
    } = models;

    Preacher.belongsTo(User, {
      foreignKey: "id",
      as: "preachers"
    });

    Preacher.belongsTo(Branch, {
      foreignKey: "id",
      as: "preacher"
    });
  };
  return Preacher;
};
