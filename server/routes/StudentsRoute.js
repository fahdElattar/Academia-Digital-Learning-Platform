const express = require('express');
const StudentsModel = require('../models/StudentsModel');

const router = express.Router();

// Get all students
router.get('/', (req, res) => {
    StudentsModel.find({})
        .then(students => res.json(students))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Insert a student
router.post('/', (req, res) => {
    StudentsModel.create(req.body)
        .then(student => res.status(201).json({ message: 'Student added successfully', student }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get a single student by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    StudentsModel.findById(id)
        .then(student => {
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.json(student);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update a student by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    StudentsModel.findByIdAndUpdate(id, req.body, { new: true })
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
    StudentsModel.findByIdAndDelete(id)
        .then(student => {
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.json({ message: 'Student deleted successfully' });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
