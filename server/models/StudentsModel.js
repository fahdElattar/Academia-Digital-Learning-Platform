const mongoose = require('mongoose')

const StudentsSchema = new mongoose.Schema({
    last_name : {
        type: String,
        required: true
    },
    first_name : {
        type: String,
        required: true
    },
    phone_number : {
        type: String,
        required: true
    },
    img_path : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('students', StudentsSchema)