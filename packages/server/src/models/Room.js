import mongoose from 'mongoose'

const roomSchema = mongoose.Schema({
    roomNumber: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    hotel: {
        type: mongoose.ObjectId,
        required: true,
    },
})

const Room = mongoose.model('Room', roomSchema)

export default Room
