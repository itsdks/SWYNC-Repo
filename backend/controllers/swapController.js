const Booking = require('../models/bookingModel')
const Swap = require('../models/swapModel')
const mongoose = require('mongoose')

const createSwap = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such booking'})
    }

    try{
        const booking = await Booking.findOneAndUpdate({_id: id}, {readyToSwap: true})
        
        if(!booking){
            return res.status(404).json({error: 'No such booking'})
        }

        res.status(200).json(booking)

    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const getSwaps = async (req, res) => {
    try{
        const swaps = await Booking.find({readyToSwap: true}).sort({updatedAt: -1})
        res.status(200).json(swaps)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const getSwap = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such swap'})
    }

    try{
        var swap = await Booking.findOne({_id: id, readyToSwap: true}, {'dID':1, '_id':0})
        var doctor = swap.dID
        console.log(id, swap, doctor)
        
        if(!swap){
            return res.status(404).json({error: 'No such swap'})
        }

        const options = await Booking.find({dID: doctor, _id: {$ne: id}, readyToSwap: true}).sort({updatedAt: -1})

        res.status(200).json(options)

    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const cancelSwap = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such booking'})
    }

    try{
        const booking = await Booking.findOneAndUpdate({_id: id}, {readyToSwap: false})
        
        if(!booking){
            return res.status(404).json({error: 'No such booking'})
        }

        res.status(200).json(booking)

    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const performSwap = async (req, res) => {
    const {bId1, bId2} = req.body

    try{
        var record1 = await Booking.findOne({_id: bId1, readyToSwap: true}, {'dID':1, 'slot':1, '_id':0})
        var record2 = await Booking.findOne({_id: bId2, readyToSwap: true}, {'dID':1, 'slot':1, '_id':0})
        doctor1 = record1.dID
        doctor2 = record2.dID
        if(!(doctor1.equals(doctor2))){
            return res.status(404).json({error: 'Cannot swap: Different doctors'})
        }
        slot1 = record1.slot
        slot2 = record2.slot

        const booking1 = await Booking.findOneAndUpdate({_id: bId1}, {
            slot: slot2,
            readyToSwap: false
        })
        const booking2 = await Booking.findOneAndUpdate({_id: bId2}, {
            slot: slot1,
            readyToSwap: false
        })

        if(!(booking1 && booking2)){
            return res.status(404).json({error: 'No such booking'})
        }

        const swap = await Swap.create({bId1, bId2})
        res.status(200).json(swap)
        
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createSwap,
    getSwaps,
    getSwap,
    cancelSwap,
    performSwap
}
