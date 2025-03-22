const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("forgetmenot", "postgres", "tonka", {
    host: "localhost",
    dialect: "postgres",
    logging: false, // Set to true to see SQL logs
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to PostgreSQL database.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = { sequelize, connectDB };
