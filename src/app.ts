import express from "express";
import mongoose from "mongoose";
import userRoutes from './userRoutes';
import dotenv from "dotenv";
import { atlas_uri } from "./config/mongo";
dotenv.config();

const app = express();
const port = process.env.port || 3000;

if (process.argv[2] === '--production') {
  mongoose.connect(atlas_uri)
    .then(() => {
      console.log('Connected to MongoDB atals successfully!');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB atals:', err);
    });
} else if (process.argv[2] === '--development') {
  mongoose.connect(process.env.mongoDbCompass)
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
  res.send('Weolcome to the home page! test!');
});
app.use(express.json()); // Parse JSON request bodies

// Use userRoutes
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log("Server runs on port:", port);
});

