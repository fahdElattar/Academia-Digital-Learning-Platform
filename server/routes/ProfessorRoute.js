const express = require('express');
const Professor = require('../models/ProfessorModel');
const Sector = require('../models/SectorModel');
const Specialty = require('../models/SpecialtyModel');
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

// Get all professors
router.get('/', (req, res) => {
    Professor.find({})
        .populate('sector_id')
        .populate('specialty_id')
        .then(professors => res.json(professors))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Insert a professor
router.post('/', upload.single('img_path'), (req, res) => {
    Sector.findById(req.body.sector_id)
        .then(sector => {
            if (!sector) {
                return res.status(404).json({ error: 'Sector not found' });
            }
            Specialty.findById(req.body.specialty_id)
                .then(specialty => {
                    if (!specialty) {
                        return res.status(404).json({ error: 'Specialty not found' });
                    }
                    const professorData = {
                        last_name: req.body.last_name,
                        first_name: req.body.first_name,
                        phone_number: req.body.phone_number,
                        img_path: req.file ? req.file.filename : null,  // Save only the filename
                        email: req.body.email,
                        password: req.body.password,
                        sector_id: req.body.sector_id,
                        specialty_id: req.body.specialty_id
                    };
                    Professor.create(professorData)
                        .then(professor => res.status(201).json({ message: 'Professor added successfully', professor }))
                        .catch(err => res.status(400).json({ error: err.message }));
                })
                .catch(err => res.status(400).json({ error: err.message }));
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get a single professor by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Professor.findById(id)
        .populate('sector_id')
        .populate('specialty_id')
        .then(professor => {
            if (!professor) {
                return res.status(404).json({ error: 'Professor not found' });
            }
            res.json(professor);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update a professor by ID
router.put('/:id', upload.single('img_path'), (req, res) => {
    const id = req.params.id;
    Sector.findById(req.body.sector_id)
        .then(sector => {
            if (!sector) {
                return res.status(404).json({ error: 'Sector not found' });
            }
            Specialty.findById(req.body.specialty_id)
                .then(specialty => {
                    if (!specialty) {
                        return res.status(404).json({ error: 'Specialty not found' });
                    }
                    const updateData = {
                        last_name: req.body.last_name,
                        first_name: req.body.first_name,
                        phone_number: req.body.phone_number,
                        img_path: req.file ? req.file.filename : req.body.img_path,  // Save only the filename
                        email: req.body.email,
                        password: req.body.password,
                        sector_id: req.body.sector_id,
                        specialty_id: req.body.specialty_id
                    };
                    Professor.findByIdAndUpdate(id, updateData, { new: true })
                        .then(professor => {
                            if (!professor) {
                                return res.status(404).json({ error: 'Professor not found' });
                            }
                            res.json({ message: 'Professor updated successfully', professor });
                        })
                        .catch(err => res.status(400).json({ error: err.message }));
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