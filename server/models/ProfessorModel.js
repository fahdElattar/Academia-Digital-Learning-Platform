const mongoose = require('mongoose');

const ProfessorSchema = new mongoose.Schema({
    last_name: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    img_path: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    sector_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sector',
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Professor', ProfessorSchema);
