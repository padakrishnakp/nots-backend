const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const noteRoutes = require('./routes/noteRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());

app.use('/api', noteRoutes);
console.log("process.env.MONGO_URI",process.env.MONGO_URI)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
