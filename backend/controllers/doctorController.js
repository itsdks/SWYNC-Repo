const Doctor = require('../models/doctorModel')
const mongoose = require('mongoose')

const getDoctors = async (req, res) => {
    try{
        const doctors = await Doctor.find({}).sort({createdAt: 1})
        res.status(200).json(doctors)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const getDoctor = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such doctor'})
    }

    try{
        const doctor = await Doctor.findById(id)
        
        if(!doctor){
            return res.status(404).json({error: 'No such doctor'})
        }

        res.status(200).json(doctor)

    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getDoctors,
    getDoctor
}