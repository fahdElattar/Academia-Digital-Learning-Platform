const mongoose = require('mongoose');

const SectorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Sector', SectorSchema);