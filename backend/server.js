require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const doctorRoutes = require('./routes/doctor')
const swapRoutes = require('./routes/swap')
const bookingRoutes =  require('./routes/booking')
const userRoutes = require('./routes/user')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/doctor', doctorRoutes)
app.use('/api/swap', swapRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

