const express = require('express');
const ProfessorModel = require('../models/ProfessorModel');

const router = express.Router();

// Get all professors
router.get('/', (req, res) => {
    ProfessorModel.find({})
        .then(professors => res.json(professors))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Insert a professor
router.post('/', (req, res) => {
    ProfessorModel.create(req.body)
        .then(professor => res.status(201).json(professor))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Get a professor by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    ProfessorModel.findById(id)
        .then(professor => {
            if (!professor) {
                return res.status(404).json({ error: 'Professor not found' });
            }
            res.json(professor);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Update a professor
router.put('/:id', (req, res) => {
    const id = req.params.id;
    ProfessorModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(professor => {
            if (!professor) {
                return res.status(404).json({ error: 'Professor not found' });
            }
            res.json(professor);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Delete a professor
router.delete('/:id', (req, res) => {
    ProfessorModel.findByIdAndDelete(req.params.id)
        .then(professor => {
            if (!professor) {
                return res.status(404).json({ error: 'Professor not found' });
            }
            res.json({ message: 'Professor deleted successfully' });
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
