
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const multer = require('multer');
// const upload = multer();

// const productRoute = require('./routes/api/productRoute');

// // Connecting to the Database
// let mongodb_url = 'mongodb://mongo/';
// let dbName = 'yolomy';

// // define a url to connect to the database
// const MONGODB_URI = process.env.MONGODB_URI || mongodb_url + dbName
// mongoose.connect(MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true  } )
// let db = mongoose.connection;

// // Check Connection
// db.once('open', ()=>{
//     console.log('Database connected successfully')
// })

// // Check for DB Errors
// db.on('error', (error)=>{
//     console.log(error);
// })

// // Initializing express
// const app = express()

// // Body parser middleware
// app.use(express.json())

// // 
// app.use(upload.array()); 

// // Cors 
// app.use(cors());

// // Use Route
// app.use('/api/products', productRoute)

// // Simple test route

// app.get('/api', (req, res) => {
//   res.send('API root is working ✅');
// });

// app.get('/', (req, res) => {
//   res.send('Welcome to the YOLO Backend API');
// });

// // Define the PORT
// const PORT = process.env.PORT || 5000

// app.listen(PORT, ()=>{
//     console.log(`Server listening on port ${PORT}`)
// })





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
require('dotenv').config(); // ✅ load .env variables

const productRoute = require('./routes/api/productRoute');

// Define the database URI
const localMongo = 'mongodb://mongo/yolomy'; // default fallback for Docker network
const MONGODB_URI = process.env.MONGO_URI || localMongo;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Connection Events
db.once('open', () => {
  console.log('✅ Database connected successfully');
});

db.on('error', (error) => {
  console.error('❌ MongoDB connection error:', error);
});

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(upload.array());
app.use(cors());

// Routes
app.use('/api/products', productRoute);

// Basic Test Routes
app.get('/api', (req, res) => {
  res.send('API root is working ✅');
});

app.get('/', (req, res) => {
  res.send('Welcome to the YOLO Backend API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
