const express = require('express');
const Professor = require('../models/ProfessorModel');
const Sector = require('../models/SectorModel');

const router = express.Router();

// Get all professors
router.get('/', (req, res) => {
    Professor.find({})
        .populate('sector_id') // Populating sector details
        .then(professors => res.json(professors))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Insert a professor
router.post('/', (req, res) => {
    Sector.findById(req.body.sector_id)
        .then(sector => {
            if (!sector) {
                return res.status(404).json({ error: 'Sector not found' });
            }
            Professor.create(req.body)
                .then(professor => res.status(201).json({ message: 'Professor added successfully', professor }))
                .catch(err => res.status(400).json({ error: err.message }));
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get a single professor by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Professor.findById(id)
        .populate('sector_id') // Populating sector details
        .then(professor => {
            if (!professor) {
                return res.status(404).json({ error: 'Professor not found' });
            }
            res.json(professor);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update a professor by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    Sector.findById(req.body.sector_id)
        .then(sector => {
            if (!sector) {
                return res.status(404).json({ error: 'Sector not found' });
            }
            Professor.findByIdAndUpdate(id, req.body, { new: true })
                .then(professor => {
                    if (!professor) {
                        return res.status(404).json({ error: 'Professor not found' });
                    }
                    res.json({ message: 'Professor updated successfully', professor });
                })
                .catch(err => res.status(400).json({ error: err.message }));
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Delete a professor by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Professor.findByIdAndDelete(id)
        .then(professor => {
            if (!professor) {
                return res.status(404).json({ error: 'Professor not found' });
            }
            res.json({ message: 'Professor deleted successfully' });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
