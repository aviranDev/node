const express = require("express");
const mongoose = require('mongoose');
const userRoutes = require('./userRoutes');

const app = express();
const port = process.env.port || 3000;

if (process.argv[2] === '--production') {
  mongoose.connect('mongodb+srv://aviran:304715840@cluster0.g4o9h.mongodb.net/testDb1?retryWrites=true&w=majority')
    .then(() => {
      console.log('Connected to MongoDB atals successfully!');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB atals:', err);
    });
} else if (process.argv[2] === '--development') {
  mongoose.connect('mongodb://127.0.0.1/testdb')
    .then(() => {
      console.log('Connected to MongoDB compass successfully!');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB compass:', err);
    });
} else {
  console.log('MongoDB connection skipped in non-production environment.');
}

app.get('/', (req, res) => {
  res.send('Weolcome to the home page!');
});
app.use(express.json()); // Parse JSON request bodies

// Use userRoutes
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log("Server runs on port:", port);
});

