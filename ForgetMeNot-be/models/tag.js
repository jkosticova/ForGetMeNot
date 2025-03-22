const {DataTypes} = require("sequelize");
const {sequelize} = require("../sequelize");

const Tag = sequelize.define(
    "Tag",
    {
        tag_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        tag_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Tag",
        timestamps: true,
    }
);

module.exports = Tag;
