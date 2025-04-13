var express = require('express');
const Tag = require("../models/tag");
var tagsRouter = express.Router();
const { Op } = require('sequelize');

tagsRouter.get('/', async function (req, res) {
    const { query } = req.query;
    try {
        let tags;
        let tagsJson = null;

        if (query) {
            console.log(`Searching for tags with query: ${query}`);
            tags = await Tag.findAll({
                where: {
                    tag_name: {
                        [Op.iLike]: `%${query}%`
                    },
                },
            });

            console.log(`Found tags: ${tags.length}`);
            tagsJson = tags.map(tag => tag.tag_name);


        } else {
            tags = await Tag.findAll();

            console.log(`Found tags: ${tags.length}`);
            tagsJson = tags.map(tag => tag.toJSON()).map(tag => ({
                tag_id: tag.tag_id,
                name: tag.tag_name
            }));

        }

        res.json(tagsJson);
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).send('Internal Server Error');
    }
});

tagsRouter.post('/', async function (req, res) {
    const {oldRecord, newRecord} = req.body;
    console.log(oldRecord, newRecord)

    if (!oldRecord || !newRecord) {
        return res.status(400).send('Old record and new record are required');
    }

    try {
        console.log(oldRecord, newRecord)

        const tag = await Tag.findOne({where: {tag_name: oldRecord.name}});

        if (!tag) {
            return res.status(404).send('Tag not found');
        }

        tag.tag_name = newRecord.name;
        await tag.save();

        res.json({});
    } catch (error) {
        console.error('Error updating tag:', error);
        res.status(500).send('Internal Server Error');
    }
});

tagsRouter.delete('/', async (req, res) => {
    const {itemId} = req.query;

    try {
        const deletedCount = await Tag.destroy({where: {tag_id: itemId}});

        if (deletedCount === 0) {
            return res.status(404).json({message: "No tag found with this ID."});
        }

        res.status(201).json({message: `Deleted tag with ID: ${itemId}`});

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to fetch items',
            error: err.message
        });
    }
});



module.exports = tagsRouter;
