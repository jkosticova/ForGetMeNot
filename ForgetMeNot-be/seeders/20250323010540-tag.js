'use strict';
const {v4: uuidv4} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tag', [
      {
        tag_id: uuidv4(),
        tag_name: 'Fantasy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag_id: uuidv4(),
        tag_name: 'Sci-Fi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag_id: uuidv4(),
        tag_name: 'Pre deti',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag_id: uuidv4(),
        tag_name: 'Historické',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag_id: uuidv4(),
        tag_name: 'Biografia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag_id: uuidv4(),
        tag_name: 'Román',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag_id: uuidv4(),
        tag_name: 'Poetika',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tag_id: uuidv4(),
        tag_name: 'Detektívky',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tag', null, {});
  }
};
