const express = require('express');
const Course = require('../models/CourseModel');

const router = express.Router();

// Get all courses
router.get('/', (req, res) => {
    Course.find({})
        .populate('professor_id')
        .then(courses => res.json(courses))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Insert a course
router.post('/', (req, res) => {
    Course.create(req.body)
        .then(course => res.status(201).json({ message: 'Course added successfully', course }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get a single course by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Course.findById(id)
        .populate('professor_id') // Populating professor details
        .then(course => {
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }
            res.json(course);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update a course by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    Course.findByIdAndUpdate(id, req.body, { new: true })
        .then(course => {
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }
            res.json({ message: 'Course updated successfully', course });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Delete a course by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Course.findByIdAndDelete(id)
        .then(course => {
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }
            res.json({ message: 'Course deleted successfully' });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
