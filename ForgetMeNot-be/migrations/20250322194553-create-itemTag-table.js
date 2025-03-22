'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ItemTag', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            item_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Item',
                    key: 'item_id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            tag_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Tag',
                    key: 'tag_id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ItemTag');
    }
};
