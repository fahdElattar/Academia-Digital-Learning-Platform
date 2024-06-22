const express = require('express');
const Admin = require('../models/AdminModel');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../client/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Get all Admins
router.get('/', (req, res) => {
    Admin.find({})
        .then(admins => res.json(admins))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Insert an Admin
router.post('/', upload.single('img_path'), (req, res) => {
    const adminData = {
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        phone_number: req.body.phone_number,
        img_path: req.file ? req.file.filename : null, 
        email: req.body.email,
        password: req.body.password, // Consider encrypting passwords
    };
    Admin.create(adminData)
        .then(admin => res.status(201).json({ message: 'Admin added successfully', admin }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get a single Admin by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Admin.findById(id)
        .then(admin => {
            if (!admin) {
                return res.status(404).json({ error: 'Admin not found' });
            }
            res.json(admin);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update an Admin by ID
router.put('/:id', upload.single('img_path'), (req, res) => {
    const id = req.params.id;

    const updateData = {
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        phone_number: req.body.phone_number,
        img_path: req.file ? req.file.filename : req.body.img_path,
        email: req.body.email,
        password: req.body.password, // Consider encrypting passwords
    };
    Admin.findByIdAndUpdate(id, updateData, { new: true })
        .then(admin => {
            if (!admin) {
                return res.status(404).json({ error: 'Admin not found' });
            }
            res.json({ message: 'Admin updated successfully', admin });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Delete an Admin by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Admin.findByIdAndDelete(id)
        .then(admin => {
            if (!admin) {
                return res.status(404).json({ error: 'Admin not found' });
            }
            res.json({ message: 'Admin deleted successfully' });
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;