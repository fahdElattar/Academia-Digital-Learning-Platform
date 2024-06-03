const mongoose = require('mongoose')

const StudentsSchema = new mongoose.Schema({
    last_name : {
        type: String,
        required: true,
    },
    first_name : {
        type: String,
        required: true
    },
    phone_number : {
        type: Number,
        required: true
    },
    img_path : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        minlength: 8
    },
    number : {
        type: Number,
        required: true
    },
    sex : {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    date_of_birth : {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('students', StudentsSchema)