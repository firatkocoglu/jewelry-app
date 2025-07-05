import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';

config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log requests
app.use(morgan('dev'));

// Simple route to test the server
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


