require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const productRoute = require('./routes/api/productRoute');

// Connect to MongoDB Atlas via env variable
const MONGODB_URI = process.env.MONGO_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('✅ Database connected successfully');
});
db.on('error', (error) => {
  console.error('❌ MongoDB connection error:', error);
});

const app = express();
app.use(express.json());
app.use(upload.array());
app.use(cors());
app.use('/api/products', productRoute);

app.get('/api', (req, res) => {
  res.send('✅ API root is working');
});
app.get('/', (req, res) => {
  res.send('Welcome to the YOLO Backend API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
