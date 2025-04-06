var express = require('express');
const User = require("../models/user");
const Tag = require("../models/tag");
const Account = require("../models/account");
var userRouter = express.Router();

userRouter.get('/', async function (req, res) {
    try {
        const users = await User.findAll();
        const usersJson = users.map(user => user.toJSON());

        res.json(usersJson);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

userRouter.post('/', async function (req, res) {
    const {oldRecord, newRecord} = req.body;
    console.log(oldRecord, newRecord)

    if (!oldRecord || !newRecord) {
        return res.status(400).send('Old record and new record are required');
    }

    try {
        console.log(oldRecord, newRecord)

        const user = await User.findOne({where: {first_name: oldRecord.first_name, last_name: oldRecord.last_name}});

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.first_name = newRecord.first_name;
        user.last_name = newRecord.last_name;
        await user.save();

        res.json({});
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

userRouter.delete('/', async (req, res) => {
    const {itemId} = req.query;

    try {
        const deletedCount = await User.destroy({where: {user_id: itemId}});

        if (deletedCount === 0) {
            return res.status(404).json({message: "No user found with this ID."});
        }

        res.status(201).json({message: `Deleted user with ID: ${itemId}`});

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to fetch items',
            error: err.message
        });
    }
});


module.exports = userRouter;
