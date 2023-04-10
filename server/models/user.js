import bcrypt from "bcryptjs";
import { config } from "dotenv";

config();

const salt = process.env.SALT || 5;
const SALT_ROUNDS = +salt;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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

      zoneid: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      branchid: {
        type: DataTypes.INTEGER,
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

      password: {
        type: DataTypes.STRING,
        allowNull: false
      },

      createdAt: {
        type: DataTypes.DATE,
        get() {
          return this.getDataValue("createdAt")
            .toLocaleString("en-GB", { timeZone: "UTC" });
        }
      },

      updatedAt: {
        type: DataTypes.DATE,
        get() {
          return this.getDataValue("updatedAt")
            .toLocaleString("en-GB", { timeZone: "UTC" });
        }
      }
    },
    {
      hooks: {
        beforeCreate: (user) => User.hashPassword(user),
        beforeUpdate: (user) => User.hashPassword(user)
      }
    }
  );

  User.associate = (models) => {
    const {
      Branch,
      Fellowship,
      Download,
      Event,
      Freport,
      Group,
      Membership,
      Training,
      Role,
      Attendance,
      Activity,
    } = models;

    User.hasMany(Training, {
      foreignKey: "id",
      as: "trainings"
    });

    User.hasMany(Membership, {
      foreignKey: "id",
      as: "memberships"
    });

    User.hasMany(Group, {
      foreignKey: "id",
      as: "groups"
    });

    User.hasMany(Freport, {
      foreignKey: "id",
      as: "freports"
    });

    User.hasMany(Attendance, {
      foreignKey: "id",
      as: "attendances"
    });

    User.hasMany(Activity, {
      foreignKey: "id",
      as: "activities"
    });

    User.hasMany(Event, {
      foreignKey: "id",
      as: "events"
    });

    User.hasMany(Download, {
      foreignKey: "id",
      as: "downloads"
    });

    User.belongsTo(Fellowship, {
      foreignKey: "id",
      as: "fellowship"
    });

    User.belongsTo(Branch, {
      foreignKey: "id",
      as: "member"
    });

    User.belongsToMany(Role, {
      through: "UserRole",
      as: "roles",
      foreignKey: "userid"
    });
  };

  User.hashPassword = async (user) => {
    const hash = await bcrypt.hash(user.dataValues.password, SALT_ROUNDS);
    await user.setDataValue("password", hash);
  };

  return User;
};
