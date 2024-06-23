const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const AdminRoute = require('./routes/AdminRoute');
const AdminModel = require('./models/AdminModel');

const ProfessorRoute = require('./routes/ProfessorRoute');
const ProfessorModel = require('./models/ProfessorModel');

const StudentRoute = require('./routes/StudentRoute')
const StudentModel = require('./models/StudentModel')

const SpecialtiesRoute = require('./routes/SpecialtyRoute');
const CourseRoute = require('./routes/CourseRoute')
const DepartmentRoute = require('./routes/DepartmentRoute')
const SectorRoute = require('./routes/SectorRoute')
const ReviewRoute = require('./routes/ReviewRoute');

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

// Admins route
app.use('/admins', AdminRoute);

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

// Authentication

app.post('/loginStudent', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await StudentModel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ status: 'error', error: 'Invalid login' });
        }

        // For plaintext password storage (not recommended), compare directly
        if (user.password !== password) {
            return res.status(401).json({ status: 'error', error: 'Invalid password' });
        }

        // Generate JWT token with user information
        const token = jwt.sign({
            id: user._id,
            last_name: user.last_name,
            first_name: user.first_name,
            type: 'student',
            img_path: user.img_path
            // Add more claims as needed
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ status: 'ok', user: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
});

app.post('/loginProfessor', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await ProfessorModel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ status: 'error', error: 'Invalid login' });
        }

        // For plaintext password storage (not recommended), compare directly
        if (user.password !== password) {
            return res.status(401).json({ status: 'error', error: 'Invalid password' });
        }

        // Generate JWT token with user information
        const token = jwt.sign({
            id: user._id,
            last_name: user.last_name,
            first_name: user.first_name,
            type: 'professor',
            img_path: user.img_path
            // Add more claims as needed
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ status: 'ok', user: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
});

app.post('/loginAdmin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await AdminModel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ status: 'error', error: 'Invalid login' });
        }

        // For plaintext password storage (not recommended), compare directly
        if (user.password !== password) {
            return res.status(401).json({ status: 'error', error: 'Invalid password' });
        }

        // Generate JWT token with user information
        const token = jwt.sign({
            id: user._id,
            last_name: user.last_name,
            first_name: user.first_name,
            type: 'admin',
            img_path: user.img_path
            // Add more claims as needed
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ status: 'ok', user: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
});

// Token verification
app.post('/verify-token', (req, res) => {
    const token = req.body.token
    try {
        const decoded = jwt.verify(token, 'secret')
        res.json({ status: 'ok', user: decoded })
    } catch(err) {
        res.json({ status: 'error', error: 'Invalid Token' })
    }
})

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
