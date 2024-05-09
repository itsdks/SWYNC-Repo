const mongoose = require('mongoose')

const schema = mongoose.Schema

const bookingSchema = new schema({
    pName: {
        type: String,
        required: true
    },
    pAge: {
        type: Number,
        required: true
    },
    pGender: {
        type: String,
        required: true
    },
    dID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    dName: {
        type: String,
        required: true
    },
    slot: {
        type: String,
        required: true
    },
    readyToSwap: {
        type: Boolean,
        default: false,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Booking', bookingSchema)