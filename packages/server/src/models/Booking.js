import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema({
    color: {
        type: String,
        required: true,
    },
    checkIn: {
        type: String,
        required: true,
        index: true,
    },
    checkOut: {
        type: String,
        required: true,
        index: true,
    },
    hotel: {
        type: mongoose.ObjectId,
        required: true,
    },
    room: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Room',
        index: true,
    },
    guest: {
        type: mongoose.ObjectId,
        required: true,
    },
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
