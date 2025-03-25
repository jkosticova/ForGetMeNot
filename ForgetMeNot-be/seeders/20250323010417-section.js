'use strict';
const {v4: uuidv4} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Section', [
      {
        section_id: uuidv4(),
        section_name: 'Kindle',
        section_type: 'Kniha',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        section_id: uuidv4(),
        section_name: 'Papierové',
        section_type: 'Kniha',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        section_id: uuidv4(),
        section_name: 'AO3',
        section_type: 'Kniha',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        section_id: uuidv4(),
        section_name: 'Netflix',
        section_type: 'Film',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        section_id: uuidv4(),
        section_name: 'Hulu',
        section_type: 'Film',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        section_id: uuidv4(),
        section_name: 'Disney+',
        section_type: 'Film',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Section', null, {});
  }
};
