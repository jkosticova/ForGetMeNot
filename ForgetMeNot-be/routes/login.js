var express = require('express');
const Account = require("../models/account");  // Adjust the import to your actual Account model
var loginRouter = express.Router();

/* POST login */
loginRouter.post('/', async function (req, res) {
  const { username, password } = req.body;  // Extract username and password from the request body

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    // Find account by username
    const account = await Account.findOne({ where: { username } });

    if (!account) {
      return res.status(401).send('Invalid username or password');
    }

    // Compare plain text passwords
    if (account.password !== password) {
      return res.status(401).send('Invalid username or password');
    }

    // If login is successful, send success message or any relevant data (e.g., account ID, token)
    res.status(200).json({ message: 'Login successful', accountId: account.id });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = loginRouter;
