const express = require('express');
const Sector = require('../models/SectorModel');
const Department = require('../models/DepartmentModel');
const router = express.Router();

// Get all sectors
router.get('/', (req, res) => {
    Sector.find({})
        .populate('department_id')
        .then(sectors => res.json(sectors))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Insert a sector
router.post('/', (req, res) => {
    Department.findById(req.body.department_id)
        .then(department => {
            if (!department) {
                return res.status(404).json({ error: 'Department not found' });
            }
            Sector.create(req.body)
                .then(sector => res.status(201).json({ message: 'Sector added successfully', sector }))
                .catch(err => res.status(400).json({ error: err.message }));
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get a single sector by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Sector.findById(id)
        .populate('department_id')
        .then(sector => {
            if (!sector) {
                return res.status(404).json({ error: 'Sector not found' });
            }
            res.json(sector);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update a sector by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    Department.findById(req.body.department_id)
        .then(department => {
            if (!department) {
                return res.status(404).json({ error: 'Department not found' });
            }
            Sector.findByIdAndUpdate(id, req.body, { new: true })
                .then(sector => {
                    if (!sector) {
                        return res.status(404).json({ error: 'Sector not found' });
                    }
                    res.json({ message: 'Sector updated successfully', sector });
                })
                .catch(err => res.status(400).json({ error: err.message }));
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Delete a sector by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Sector.findByIdAndDelete(id)
        .then(sector => {
            if (!sector) {
                return res.status(404).json({ error: 'Sector not found' });
            }
            res.json({ message: 'Sector deleted successfully' });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
