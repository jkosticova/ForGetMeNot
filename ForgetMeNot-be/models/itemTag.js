const {DataTypes} = require("sequelize");
const {sequelize} = require("../sequelize");

const ItemTag = sequelize.define(
    "ItemTag",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        item_id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        tag_id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
    },
    {
        tableName: "ItemTag",
        timestamps: true,
    }
);

module.exports = ItemTag;
