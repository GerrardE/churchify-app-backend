module.exports = (sequelize, DataTypes) => {
  const ForgotPassword = sequelize.define(
    "ForgotPassword",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true, // Ensures only valid emails are stored
        },
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false, // Ensure an expiry is always set
      },
      status: {
        type: DataTypes.ENUM("NOT_USED", "USED"), // Restrict values
        allowNull: false,
        defaultValue: "NOT_USED",
      },
    },
    {
      sequelize,
      modelName: "ForgotPassword",
      tableName: "forgot_passwords", // Explicit table name to avoid pluralization issues
      timestamps: true, // Automatically adds createdAt and updatedAt
      underscored: true, // Converts camelCase to snake_case in DB (optional)
    }
  );

  return ForgotPassword;
};
