const express = require("express");
const mongoose = require('mongoose');
const userRoutes = require('./userRoutes');
const app = express();
const port = process.env.port || 3000;

// Connect to MongoDB
mongoose.connect('')
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.get('/', (req, res) => {
  res.send('Weolcome to the home page!');
});
app.use(express.json()); // Parse JSON request bodies

// Use userRoutes
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log("Server runs on port:", port);
});

