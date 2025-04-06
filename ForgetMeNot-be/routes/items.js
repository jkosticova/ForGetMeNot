var express = require('express');
const Item = require("../models/item");
var itemsRouter = express.Router();

itemsRouter.get('/', async function (req, res) {
    try {
        const items = await Item.findAll();
        const itemsJson = items.map(item => item.toJSON());

        res.json(itemsJson);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

itemsRouter.post('/', async function (req, res) {
    const {oldRecord, newRecord} = req.body;
    console.log(oldRecord, newRecord)

    if (!oldRecord || !newRecord) {
        return res.status(400).send('Old record and new record are required');
    }

    try {
        console.log(oldRecord, newRecord)

        const item = await Item.findOne({where: {title: oldRecord.title, author: oldRecord.author, year: oldRecord.year}});

        if (!item) {
            return res.status(404).send('Item not found');
        }

        item.title = newRecord.title;
        item.author = newRecord.author;
        item.year = newRecord.year;
        await item.save();

        res.json({});
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send('Internal Server Error');
    }
});

itemsRouter.delete('/', async (req, res) => {
    const {itemId} = req.query;

    console.log(req.query)
    try {
        const deletedCount = await Item.destroy({where: {item_id: itemId}});

        if (deletedCount === 0) {
            return res.status(404).json({message: "No item found with this ID."});
        }

        res.status(201).json({message: `Deleted item with ID: ${itemId}`});

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to fetch items',
            error: err.message
        });
    }
});

module.exports = itemsRouter;
