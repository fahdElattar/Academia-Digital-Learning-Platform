const express = require('express');
const StudentModel = require('../models/StudentModel');
const Certificate = require('../models/CertificateModel');
const Course = require('../models/CourseModel');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await StudentModel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ status: 'error', error: 'Invalid login' });
        }

        if (user.password !== password) {
            return res.status(401).json({ status: 'error', error: 'Invalid password' });
        }

        // Generate JWT token with user information
        const token = jwt.sign({
            id: user._id,
            type: 'student',
            email: user.email
            // Add more claims as needed
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ status: 'ok', user: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
});


// Set up multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../client/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Get all students
router.get('/', (req, res) => {
    StudentModel.find({})
        .populate('courses')
        .then(students => res.json(students))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Insert a student
router.post('/', upload.single('img_path'), (req, res) => {
    const studentData = {
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        phone_number: req.body.phone_number,
        img_path: req.file ? req.file.filename : null,
        email: req.body.email,
        password: req.body.password,
        sex: req.body.sex,
        date_of_birth: req.body.date_of_birth
    };
    StudentModel.create(studentData)
        .then(student => res.status(201).json({ message: 'Student added successfully', student }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get a single student by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    StudentModel.findById(id)
        .populate('courses')
        .then(student => {
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.json(student);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update a student by ID
router.put('/:id', upload.single('img_path'), (req, res) => {
    const id = req.params.id;
    const updateData = {
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        phone_number: req.body.phone_number,
        img_path: req.file ? req.file.filename : req.body.img_path,
        email: req.body.email,
        password: req.body.password,
        sex: req.body.sex,
        date_of_birth: req.body.date_of_birth
    };
    StudentModel.findByIdAndUpdate(id, updateData, { new: true })
        .then(student => {
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.json({ message: 'Student updated successfully', student });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Delete a student by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    StudentModel.findByIdAndDelete(id)
        .then(student => {
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.json({ message: 'Student deleted successfully' });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get certificates for a student
router.get('/:id/certificates', (req, res) => {
    Certificate.find({ student: req.params.id })
        .populate('course')
        .then(certificates => res.json(certificates))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Get courses a student is enrolled in
router.get('/student/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    Course.find({ students: studentId })
        .populate('professor_id')
        .populate('students')
        .then(courses => {
            if (courses.length === 0) {
                return res.status(404).json({ error: 'No courses found for this student' });
            }
            res.json(courses);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;