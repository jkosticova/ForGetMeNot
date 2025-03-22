const {DataTypes} = require("sequelize");
const {sequelize} = require("../sequelize");

const Item = sequelize.define(
    "Item",
    {
        item_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Item",
        timestamps: true,
    }
);

module.exports = Item;
