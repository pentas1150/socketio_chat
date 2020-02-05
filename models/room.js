module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "room",
    {
      title: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      max: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("now()")
      }
    },
    {
      timestamps: false
    }
  );
};
