const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Video', 'Audio', 'Text']
    },
    img_path: {
        type: String,
    },
    course_path: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    professor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor',
        required: true,
    },
    // students regitered in the course
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', CourseSchema);