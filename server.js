const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactions');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();


app.use(cors());
app.use(express.json());


app.use('/api/transactions', transactionRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
