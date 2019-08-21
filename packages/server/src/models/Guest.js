import mongoose from 'mongoose'

const guestSchema = mongoose.Schema({
    id: {
        type: mongoose.ObjectId,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
})

const Guest = mongoose.model('Guest', guestSchema)

export default Guest
