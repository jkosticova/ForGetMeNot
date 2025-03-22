'use strict';
const {v4: uuidv4} = require('uuid');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("User", [
            {
                user_id: uuidv4(),
                first_name: "John",
                last_name: "Doe",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                user_id: uuidv4(),
                first_name: "Jane",
                last_name: "Smith",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                user_id: uuidv4(),
                first_name: "Alice",
                last_name: "Johnson",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("User", null, {});
    }
};
