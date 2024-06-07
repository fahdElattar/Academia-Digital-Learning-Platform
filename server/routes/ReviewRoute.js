const express = require('express');
const Review = require('../models/ReviewModel');
const Student = require('../models/StudentModel');
const Course = require('../models/CourseModel');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Get all reviews for a specific course by course ID
router.get('/course/:courseId', (req, res) => {
    const { courseId } = req.params;
    Review.find({ course: courseId })
        .populate('student')
        .populate('course')
        .then(reviews => {
            if (reviews.length === 0) {
                return res.status(404).json({ message: 'No reviews found for this course' });
            }
            res.json(reviews);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get all reviews
router.get('/', (req, res) => {
    Review.find({})
        .populate('student')
        .populate('course')
        .then(reviews => res.json(reviews))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Insert a review
router.post('/', upload.single('review_path'), (req, res) => {
    const { student, course, description, emotion } = req.body;
    const reviewData = {
        student,
        course,
        review_path: req.file ? req.file.filename : null,
        description,
        emotion,
        date: new Date(),
    };
    
    Review.create(reviewData)
        .then(review => res.status(201).json({ message: 'Review added successfully', review }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get a single review by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Review.findById(id)
        .populate('student')
        .populate('course')
        .then(review => {
            if (!review) {
                return res.status(404).json({ error: 'Review not found' });
            }
            res.json(review);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update a review by ID
router.put('/:id', upload.single('review_path'), (req, res) => {
    const id = req.params.id;
    const { student, course, description, emotion } = req.body;
    const updateData = {
        student,
        course,
        review_path: req.file ? req.file.filename : req.body.review_path,
        description,
        emotion,
        date: new Date(),
    };

    Review.findByIdAndUpdate(id, updateData, { new: true })
        .then(review => {
            if (!review) {
                return res.status(404).json({ error: 'Review not found' });
            }
            res.json({ message: 'Review updated successfully', review });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Delete a review by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Review.findByIdAndDelete(id)
        .then(review => {
            if (!review) {
                return res.status(404).json({ error: 'Review not found' });
            }
            res.json({ message: 'Review deleted successfully' });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;