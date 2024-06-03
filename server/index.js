const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProfessorsRoute = require('./routes/ProfessorsRoute');

const app = express();

app.use(cors());
app.use(express.json());

// Professors route
app.use('/professors', ProfessorsRoute);

// database connection
mongoose.connect('mongodb://127.0.0.1:27017/academia')
.then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
});
