const {DataTypes} = require("sequelize");
const {sequelize} = require("../sequelize");

const Section = sequelize.define(
    "Section",
    {
        section_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        section_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        section_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Section",
        timestamps: true,
    }
);

module.exports = Section;
