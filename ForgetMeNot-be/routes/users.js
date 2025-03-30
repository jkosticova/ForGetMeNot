var express = require('express');
const User = require("../models/user");
var userRouter = express.Router();

/* GET users listing. */

userRouter.get('/', async function(req, res) {
  try {
    const users = await User.findAll();
    const usersJson = users.map(user => user.toJSON());

    res.json(usersJson);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = userRouter;
