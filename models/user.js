module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      socketid: {
        type: DataTypes.STRING(50),
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
