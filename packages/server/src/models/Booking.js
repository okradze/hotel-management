import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema({
    id: {
        type: mongoose.ObjectId,
        required: true,
        unique: true,
    },
    color: {
        type: String,
        required: true,
    },
    checkIn: {
        type: String,
        required: true,
    },
    checkOut: {
        type: String,
        required: true,
    },
    hotel: {
        type: mongoose.ObjectId,
        required: true,
    },
    room: {
        type: mongoose.ObjectId,
        required: true,
    },
    guest: {
        type: mongoose.ObjectId,
        required: true,
    },
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
