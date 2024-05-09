const Booking = require('../models/bookingModel')
const Doctor = require('../models/doctorModel')
const mongoose = require('mongoose')

const createBooking = async (req, res) => {
    const {pName, pAge, pGender, dID, dName, slot} = req.body

    if(!mongoose.Types.ObjectId.isValid(dID)){
        return res.status(404).json({error: 'No such doctor'})
    }

    const date = new Date(slot)
    const day = date.getDay()

    const doctor = await Doctor.find({_id: dID, schedule: day})   
    if(!doctor){
        return res.status(404).json({error: 'Doctor not available'})
    }

    const booked = await Booking.find({dID: dID, slot: slot})
    if(booked.length){
        return res.status(400).json({error: 'Slot already booked'})
    }

    try{
        const user_id = req.user._id
        const booking = await Booking.create({pName, pAge, pGender, dID, dName, slot, user_id})
        res.status(200).json(booking)
    } catch(error){ 
        res.status(400).json({error: error.message})
    }
}

const getBookings = async (req, res) => {
    try{
        const user_id = req.user._id
        const bookings = await Booking.find({user_id}).sort({updatedAt: -1})
        res.status(200).json(bookings)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const getBooking = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such booking'})
    }

    try{
        const booking = await Booking.findById(id)
        
        if(!booking){
            return res.status(404).json({error: 'No such booking'})
        }

        res.status(200).json(booking)

    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteBooking = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such booking'})
    }

    try{
        const booking = await Booking.findOneAndDelete({_id: id})
        
        if(!booking){
            return res.status(404).json({error: 'No such booking'})
        }

        res.status(200).json(booking)

    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createBooking,
    getBookings,
    getBooking,
    deleteBooking
}