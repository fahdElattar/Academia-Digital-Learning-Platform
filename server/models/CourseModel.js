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
    professor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor',
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', CourseSchema);