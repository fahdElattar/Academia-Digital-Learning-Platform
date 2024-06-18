const express = require('express');
const Course = require('../models/CourseModel');
const Professor = require('../models/ProfessorModel');
const Student = require('../models/StudentModel');
const Certificate = require('../models/CertificateModel');
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

// Get all courses
router.get('/', (req, res) => {
    Course.find({})
        .populate('professor_id')
        .populate('students')
        .then(courses => res.json(courses))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Insert a course
router.post('/', upload.fields([{ name: 'img_path', maxCount: 1 }, { name: 'course_path', maxCount: 1 }]), (req, res) => {
    Professor.findById(req.body.professor_id)
        .then(professor => {
            if (!professor) {
                return res.status(404).json({ error: 'Professor not found' });
            }

            let type;
            if (req.files['course_path']) {
                const mimetype = req.files['course_path'][0].mimetype;
                if (mimetype.startsWith('video/')) {
                    type = 'Video';
                } else if (mimetype.startsWith('audio/')) {
                    type = 'Audio';
                } else {
                    type = 'Text';
                }
            } else {
                type = 'Text';
            }
            
            const courseData = {
                name: req.body.name,
                type: type,
                img_path: req.files['img_path'] ? req.files['img_path'][0].filename : null,
                course_path: req.files['course_path'] ? req.files['course_path'][0].filename : null,
                description: req.body.description,
                details: req.body.details,
                date: req.body.date,
                professor_id: req.body.professor_id
            };
            Course.create(courseData)
                .then(course => res.status(201).json({ message: 'Course added successfully', course }))
                .catch(err => res.status(400).json({ error: err.message }));
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Get a single course by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Course.findById(id)
        .populate('professor_id')
        .populate('students')
        .then(course => {
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }
            res.json(course);
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update a course by ID
router.put('/:id', upload.fields([{ name: 'img_path', maxCount: 1 }, { name: 'course_path', maxCount: 1 }]), (req, res) => {
    const id = req.params.id;
    Professor.findById(req.body.professor_id)
        .then(professor => {
            if (!professor) {
                return res.status(404).json({ error: 'Professor not found' });
            }
            const updateData = {
                name: req.body.name,
                type: req.body.type,
                img_path: req.files['img_path'] ? req.files['img_path'][0].filename : req.body.img_path,
                course_path: req.files['course_path'] ? req.files['course_path'][0].filename : req.body.course_path,
                description: req.body.description,
                details: req.body.details,
                date: req.body.date,
                professor_id: req.body.professor_id
            };
            Course.findByIdAndUpdate(id, updateData, { new: true })
                .then(course => {
                    if (!course) {
                        return res.status(404).json({ error: 'Course not found' });
                    }
                    res.json({ message: 'Course updated successfully', course });
                })
                .catch(err => res.status(400).json({ error: err.message }));
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

// Enroll a student in a course
router.post('/:courseId/enroll', (req, res) => {
    const { studentId } = req.body;
    Course.findById(req.params.courseId)
        .then(course => {
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }
            Student.findById(studentId)
                .then(student => {
                    if (!student) {
                        return res.status(404).json({ error: 'Student not found' });
                    }
                    if (!course.students.includes(studentId)) {
                        course.students.push(studentId);
                        student.courses.push(req.params.courseId);
                    }
                    course.save();
                    student.save();
                    res.json({ message: 'Student enrolled successfully', course, student });
                })
                .catch(err => res.status(400).json({ error: err.message }));
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

// Grant a certificate to a student for a course
router.post('/:courseId/certificate', (req, res) => {
    const { studentId } = req.body;
    Course.findById(req.params.courseId)
        .then(course => {
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }
            Student.findById(studentId)
                .then(student => {
                    if (!student) {
                        return res.status(404).json({ error: 'Student not found' });
                    }
                    const certificate = new Certificate({
                        course: req.params.courseId,
                        student: studentId
                    });
                    certificate.save()
                        .then(certificate => res.json({ message: 'Certificate granted successfully', certificate }))
                        .catch(err => res.status(400).json({ error: err.message }));
                })
                .catch(err => res.status(400).json({ error: err.message }));
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;