const express = require('express');
const Specialty = require('../models/SpecialtyModel');

const router = express.Router();

// Get all specialties
router.get('/', async (req, res) => {
    try {
        const specialties = await Specialty.aggregate([
            {
                $lookup: {
                    from: 'professors',
                    localField: '_id',
                    foreignField: 'specialty_id',
                    as: 'professors'
                }
            },
            {
                $addFields: {
                    professorCount: { $size: '$professors' }
                }
            },
            {
                $project: {
                    professors: 0
                }
            }
        ]);

        res.json(specialties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Insert a specialty
router.post('/', (req, res) => {
    Specialty.create(req.body)
        .then(specialty => res.status(201).json({ message: 'Specialty added successfully', specialty }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get a single specialty by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Specialty.findById(id)
        .then(specialty => {
            if (!specialty) {
                return res.status(404).json({ error: 'Specialty not found' });
            }
            res.json(specialty);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update a specialty by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    Specialty.findByIdAndUpdate(id, req.body, { new: true })
        .then(specialty => {
            if (!specialty) {
                return res.status(404).json({ error: 'Specialty not found' });
            }
            res.json({ message: 'Specialty updated successfully', specialty });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Delete a specialty by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Specialty.findByIdAndDelete(id)
        .then(specialty => {
            if (!specialty) {
                return res.status(404).json({ error: 'Specialty not found' });
            }
            res.json({ message: 'Specialty deleted successfully' });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
