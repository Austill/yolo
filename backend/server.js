
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
