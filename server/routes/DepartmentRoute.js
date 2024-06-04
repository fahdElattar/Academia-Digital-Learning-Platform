const express = require('express');
const Department = require('../models/DepartmentModel');

const router = express.Router();

// Get all departments with sector count
router.get('/', async (req, res) => {
    try {
        const departments = await Department.aggregate([
            {
                $lookup: {
                    from: 'sectors',
                    localField: '_id',
                    foreignField: 'department_id',
                    as: 'sectors'
                }
            },
            {
                $addFields: {
                    sectorCount: { $size: '$sectors' }
                }
            },
            {
                $project: {
                    sectors: 0 // Optionally exclude the sectors array because i only need the count
                }
            }
        ]);

        res.json(departments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
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
