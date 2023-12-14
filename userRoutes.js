const express = require('express');
const User = require('./model');

const router = express.Router();

// Example route to create a new user
router.post('/create-user', async (req, res) => {
  try {
    await User.create(req.body);
    res.send('User created successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

module.exports = router;
