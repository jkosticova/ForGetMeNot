'use strict';
const {v4: uuidv4} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Account', [
            {
                account_id: uuidv4(),
                username: 'normal',
                user_id: '3e52d9f7-d841-4111-abdd-d11b8ff045f1',
                password: 'normal',
                is_admin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                account_id: uuidv4(),
                username: 'admin',
                user_id: '3e52d9f7-d841-4111-abdd-d11b8ff045f1',
                password: 'admin',
                is_admin: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Account', null, {});
    }
};
