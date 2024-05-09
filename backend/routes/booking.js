const express = require('express')

const {
    getBookings,
    getBooking,
    deleteBooking
} = require('../controllers/bookingController')
const {createSwap} = require('../controllers/swapController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getBookings)

router.get('/:id', getBooking)

router.patch('/:id', createSwap)

router.delete('/:id', deleteBooking)

module.exports = router