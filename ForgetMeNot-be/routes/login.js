var express = require('express');
const Account = require("../models/account");
var loginRouter = express.Router();

/* POST login */
loginRouter.post('/', async function (req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    const account = await Account.findOne({ where: { username } });

    if (!account) {
      return res.status(401).send('Invalid username or password');
    }

    if (account.password !== password) {
      return res.status(401).send('Invalid username or password');
    }

    res.status(200).json({ message: 'Login successful', accountId: account.id });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = loginRouter;
