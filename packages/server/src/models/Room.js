import mongoose from 'mongoose'

const roomSchema = mongoose.Schema({
    id: {
        type: mongoose.ObjectId,
        required: true,
        unique: true,
    },
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
})

const Room = mongoose.model('Room', roomSchema)

export default Room
