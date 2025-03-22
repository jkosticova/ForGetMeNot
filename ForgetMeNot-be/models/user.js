const {DataTypes} = require("sequelize");
const {sequelize} = require("../sequelize");

const User = sequelize.define(
    "User",
    {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "User",
        timestamps: true,
    }
);

module.exports = User;
