const mongoose = require('mongoose')

const schema = mongoose.Schema

const doctorSchema = new schema({
    name: {
        type: String,
        required: true
    },
    specialisation: {
        type: String,
        required: true
    },
    schedule: {
        type: Array,
        default: [],
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Doctor', doctorSchema)