const express = require('express');
const Review = require('../models/ReviewModel');
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

    // Determine the file type based on MIME type
    let type;
    if (req.file) {
        const mimeType = req.file.mimetype;
        if (mimeType.startsWith('video/')) {
            type = 'video';
        } else if (mimeType.startsWith('audio/')) {
            type = 'audio';
        } else {
            return res.status(400).json({ error: 'Unsupported file type' });
        }
    } else {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const reviewData = {
        student,
        course,
        review_path: req.file.filename,
        description,
        type,
        emotion,
        date: new Date(),
    };

    Review.create(reviewData)
        .then(review => res.status(201).json({ message: 'Review added successfully', review }))
        .catch(err => {
            console.error(err); // Log the error for debugging
            res.status(400).json({ error: err.message });
        });
});
// Get statistics for a specific course
router.get('/course/:courseId/statistics', async (req, res) => {
    const { courseId } = req.params;
    try {
        // Fetch reviews sorted by date
        const reviews = await Review.find({ course: courseId })
            .populate('student')
            .populate('course')
            .sort({ date: 1 }); // 1 for ascending, -1 for descending

        const emotionCounts = {
            anger: 0,
            fear: 0,
            disgust: 0,
            neutral: 0,
            happy: 0,
            sad: 0,
            surprise: 0,
        };

        const emotionByGender = {
            male: { anger: 0, fear: 0, disgust: 0, neutral: 0, happy: 0, sad: 0, surprise: 0 },
            female: { anger: 0, fear: 0, disgust: 0, neutral: 0, happy: 0, sad: 0, surprise: 0 }
        };

        const emotionByDate = {};

        reviews.forEach(review => {
            emotionCounts[review.emotion]++;
            const gender = review.student.sex.toLowerCase();
            emotionByGender[gender][review.emotion]++;

            const date = new Date(review.date).toLocaleDateString();
            if (!emotionByDate[date]) {
                emotionByDate[date] = { anger: 0, fear: 0, disgust: 0, neutral: 0, happy: 0, sad: 0, surprise: 0 };
            }
            emotionByDate[date][review.emotion]++;
        });

        const stats = {
            totalReviews: reviews.length,
            emotionCounts,
            emotionByGender,
            emotionByDate,
        };

        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
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