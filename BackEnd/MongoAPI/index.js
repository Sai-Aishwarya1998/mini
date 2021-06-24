const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')

app.use(cors()) 

const authRoute = require('./routes/auth');
const bookingRoute = require('./routes/booking'); 

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true , useUnifiedTopology: true },
    () => console.log('Connected to DB')
);

app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api', bookingRoute);

app.listen(8081, () => console.log('Server Up and Running'));