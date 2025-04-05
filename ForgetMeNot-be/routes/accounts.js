var express = require('express');
const Account = require("../models/account");
const User = require("../models/user");
var accountsRouter = express.Router();

/* GET users listing. */

accountsRouter.get('/', async function(req, res) {
  try {
    const accounts = await Account.findAll();
    const users = await User.findAll();
    const accountsJson = accounts.map(account => account.toJSON());
    const usersJson = users.map(user => user.toJSON());

    const mergedData = accountsJson.map(account => {
      // Find corresponding user for the account by user_id
      const user = usersJson.find(u => u.user_id === account.user_id);

      console.log(user, usersJson[0].user_id, accountsJson[0].user_id)
      // Merge account and user data
      return {
        username: account.username,
        first_name: user ? user.first_name : null, // Add user data or null if not found
        last_name: user ? user.last_name : null, // Add user data or null if not found
      };
    });

    // Return the merged data as JSON
    res.json(mergedData);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = accountsRouter;
