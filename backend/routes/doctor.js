const express = require('express')

const {
    getDoctors,
    getDoctor
} = require('../controllers/doctorController')
const {createBooking} = require('../controllers/bookingController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getDoctors)

router.get('/:id', getDoctor)

router.post('/', createBooking)

module.exports = router