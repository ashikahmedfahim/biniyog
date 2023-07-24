const { sequelize } = require("../configs/dbConfig");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.first_name} ${this.last_name}`;
            },
            set(value) {
                throw new Error('Do not try to set the `fullName` value!');
            }
        },
        status: {
            type: DataTypes.ENUM,
            allowNull:false,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        }
    },
    {
        tableName: "users",
        freezeTableName: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },

);
// sync force
// User.sync({ force: true });
module.exports = User;