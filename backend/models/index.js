const { sequelize } = require("../configs/dbConfig");
const User = require("./user");

// sequelize.sync();

module.exports = {
    User,
};