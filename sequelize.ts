import { Sequelize } from "sequelize-typescript";
require("dotenv").config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "mysql",
  username: process.env.DB_ID,
  password: process.env.DB_PW,
  storage: ":memory",
  models: [__dirname + "/models"]
});

export default sequelize;
