const { Sequelize } = require("sequelize");
require("dotenv").config();

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const STAGE = process.env.STAGE || "dev";

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
  logging: STAGE === "dev" ? console.log : false,
});

module.exports.connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports.sequelize = sequelize;