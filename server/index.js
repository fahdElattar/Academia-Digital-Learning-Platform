const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProfessorRoute = require('./routes/ProfessorRoute');
const SpecialtiesRoute = require('./routes/SpecialtyRoute');
const StudentRoute = require('./routes/StudentRoute')
const CourseRoute = require('./routes/CourseRoute')
const DepartmentRoute = require('./routes/DepartmentRoute')
const SectorRoute = require('./routes/SectorRoute')
const ReviewRoute = require('./routes/ReviewRoute');

const app = express();

app.use(cors());
app.use(express.json());

// Professors route
app.use('/professors', ProfessorRoute);

// Specialties route
app.use('/specialties', SpecialtiesRoute);

// Students Route
app.use('/students', StudentRoute)

// Courses Route
app.use('/courses', CourseRoute)

// Departments Route 
app.use('/departments', DepartmentRoute)

// Sectors Route
app.use('/sectors', SectorRoute)

// Sectors Route
app.use('/reviews', ReviewRoute)

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
