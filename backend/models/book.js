const { sequelize } = require("../configs/dbConfig");
const { DataTypes } = require("sequelize");

const Book = sequelize.define(
    "Book",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${process.env.APP_URL}/${this.image_name}`;
            },
            set(value) {
                throw new Error("Do not try to set the `image_url` value!");
            }
        },
        status: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['active', 'inactive'],
            defaultValue: 'active'
        }
    },
    {
        tableName: "books",
        freezeTableName: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },

);
// sync force
// User.sync({ force: true });
module.exports = Book;