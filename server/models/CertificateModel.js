const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    issueDate: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Certificate', CertificateSchema);
