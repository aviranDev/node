import express from "express";
import mongoose from "mongoose";
import userRoutes from './routes/users';
import dotenv from "dotenv";
import { atlas_uri } from "./config/mongo";
import morgan from 'morgan';
import { errorHandler } from "./errors/errorHandler";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

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
  res.send('Weolcome to the home page!');
});
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev')); // Parse JSON request bodies

// Use userRoutes
app.use('/users', userRoutes);
app.use(errorHandler);


app.listen(port, () => {
  console.log("Server runs on port:", port);
});

