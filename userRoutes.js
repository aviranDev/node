const express = require('express');
const User = require('./model');

const router = express.Router();

// Example route to create a new user
router.get('/create-user', async (req, res) => {
  try {
    const newUser = new User({ name: 'John Doe', email: 'john@example.com' });
    await newUser.save();
    res.send('User created successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

module.exports = router;
