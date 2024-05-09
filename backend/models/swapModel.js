const mongoose = require('mongoose')

const schema = mongoose.Schema

const swapSchema = new schema({
    bId1: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    bId2: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Swap', swapSchema)