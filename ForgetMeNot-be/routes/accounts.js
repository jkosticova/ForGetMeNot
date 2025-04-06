var express = require('express');
const Account = require("../models/account");
const User = require("../models/user");
const Tag = require("../models/tag");
var accountsRouter = express.Router();

accountsRouter.get('/', async function (req, res) {
    try {
        const accounts = await Account.findAll();
        const users = await User.findAll();
        const accountsJson = accounts.map(account => account.toJSON());
        const usersJson = users.map(user => user.toJSON());

        const mergedData = accountsJson.map(account => {
            const user = usersJson.find(u => u.user_id === account.user_id);

            console.log(user, usersJson[0].user_id, accountsJson[0].user_id)
            return {
                username: account.username,
                first_name: user ? user.first_name : null,
                last_name: user ? user.last_name : null,
            };
        });

        res.json(mergedData);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).send('Internal Server Error');
    }
});

accountsRouter.post('/', async function (req, res) {
    const {oldRecord, newRecord} = req.body;
    console.log(oldRecord, newRecord)

    if (!oldRecord || !newRecord) {
        return res.status(400).send('Old record and new record are required');
    }

    try {
        console.log(oldRecord, newRecord)

        const account = await Account.findOne({where: {username: oldRecord.username}});

        if (!account) {
            return res.status(404).send('Account not found');
        }

        account.username = newRecord.username;
        await account.save();

        res.json({});
    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = accountsRouter;
