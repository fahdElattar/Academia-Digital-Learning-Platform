const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const StudentSchema = new mongoose.Schema({
    last_name: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
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
    number: {
        type: Number,
        unique: true
    },
    sex: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}, {
    timestamps: true
});

StudentSchema.plugin(AutoIncrement, { inc_field: 'number' });

module.exports = mongoose.model('Student', StudentSchema);
