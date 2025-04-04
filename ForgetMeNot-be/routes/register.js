var express = require('express');
const User = require("../models/user");
const Account = require("../models/account");
var registerRouter = express.Router();

/* POST register */
registerRouter.post('/', async function (req, res) {
  const { firstname, lastname, username, password } = req.body;

  console.log(firstname, lastname);

  if (!firstname || !lastname || !username || !password) {
    return res.status(400).send('All fields are required');
  }

  try {
    let user = await User.findOne({ where: { first_name: firstname, last_name: lastname } });
    console.log(user);

    if (!user) {
      user = await User.create({ first_name: firstname, last_name: lastname });
      console.log('created user ', user);
    }

    const account = await Account.create({
      username,
      user_id: user.user_id,
      password
    });


    res.status(201).json({
      message: 'Registration successful',
      userId: user.user_id,
      name: username,
      admin: account.is_admin,
    });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = registerRouter;
