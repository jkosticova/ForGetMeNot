var express = require('express');
const Tag = require("../models/tag");
const Section = require("../models/section");
var tagsRouter = express.Router();

tagsRouter.get('/', async function (req, res) {
    try {
        const tags = await Tag.findAll();
        const tagsJson = tags.map(tags => tags.toJSON()).map(tags => ({tag_id: tags.tag_id, name: tags.tag_name}));

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
