import mongoose from 'mongoose'

const guestSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: 'text',
    },
    phone: {
        type: Number,
        required: true,
        trim: true,
    },
    hotel: {
        type: mongoose.ObjectId,
        required: true,
        index: true,
    },
})

const Guest = mongoose.model('Guest', guestSchema)

export default Guest
