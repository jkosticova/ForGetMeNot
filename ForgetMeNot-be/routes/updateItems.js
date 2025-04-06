var express = require('express');
const ItemAccount = require("../models/itemAccount");
var itemAccountRouter = express.Router();

itemAccountRouter.post('/', async function (req, res) {
    const {oldRecord, newRecord} = req.body;
    console.log(oldRecord, newRecord)

    if (!oldRecord || !newRecord) {
        return res.status(400).send('Old record and new record are required');
    }

    try {
        console.log(oldRecord, newRecord)

        const item = await ItemAccount.findOne({where: {id: oldRecord.id}});

        if (!item) {
            return res.status(404).send('User not found');
        }

        item.item_id = newRecord.item_id;
        item.account_id = newRecord.account_id;
        item.link = newRecord.link;
        item.last_minute = newRecord.last_minute;
        item.last_chapter = newRecord.last_chapter;
        item.done = newRecord.done;
        item.notes = newRecord.notes;
        item.favourtie_parts = newRecord.favourite_parts;
        item.story_rating = newRecord.story_rating;
        item.scenery_rating = newRecord.scenery_rating;
        item.ending_rating = newRecord.ending_rating;
        item.public = newRecord.public;
        await item.save();

        res.json({});
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = itemAccountRouter;
