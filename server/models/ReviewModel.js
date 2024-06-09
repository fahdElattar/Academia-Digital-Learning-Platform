const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    review_path: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['video', 'audio']
    },
    emotion: {
        type: String,
        enum: ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprised'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Review', ReviewSchema);