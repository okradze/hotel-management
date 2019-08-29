import mongoose from 'mongoose'

const roomSchema = mongoose.Schema({
    roomNumber: {
        type: Number,
        required: true,
        index: true,
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

roomSchema.index({ roomNumber: 1, type: 'text' })

const Room = mongoose.model('Room', roomSchema)

export default Room
