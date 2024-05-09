const express = require('express')

const {
    getSwaps,
    getSwap,
    cancelSwap,
    performSwap
} = require('../controllers/swapController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getSwaps)

router.get('/:id', getSwap)

router.post('/', performSwap)

router.patch('/:id', cancelSwap)

module.exports = router