const express = require('express');
const Department = require('../models/DepartmentModel');

const router = express.Router();

// Get all departments
router.get('/', (req, res) => {
    Department.find({})
        .then(departments => res.json(departments))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Insert a department
router.post('/', (req, res) => {
    Department.create(req.body)
        .then(department => res.status(201).json({ message: 'Department added successfully', department }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get a single department by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Department.findById(id)
        .then(department => {
            if (!department) {
                return res.status(404).json({ error: 'Department not found' });
            }
            res.json(department);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update a department by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    Department.findByIdAndUpdate(id, req.body, { new: true })
        .then(department => {
            if (!department) {
                return res.status(404).json({ error: 'Department not found' });
            }
            res.json({ message: 'Department updated successfully', department });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Delete a department by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Department.findByIdAndDelete(id)
        .then(department => {
            if (!department) {
                return res.status(404).json({ error: 'Department not found' });
            }
            res.json({ message: 'Department deleted successfully' });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
