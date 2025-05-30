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
        itemAccount_id: {
            type: DataTypes.UUID,
            foreignKey: true,
        },
        tag_id: {
            type: DataTypes.UUID,
            foreignKey: true,
        },
    },
    {
        tableName: "ItemTag",
        timestamps: true,
    }
);

module.exports = ItemTag;
