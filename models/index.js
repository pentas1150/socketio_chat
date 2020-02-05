const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Room = require("./room")(sequelize, Sequelize);

db.User.hasOne(db.Room, { foreignKey: "author", sourceKey: "id" });
db.Room.belongsTo(db.User, { foreignKey: "author", targetKey: "id" });

module.exports = db;
