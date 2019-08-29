import mongoose from 'mongoose'

const hotelSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    },
)
const Hotel = mongoose.model('Hotel', hotelSchema)

export default Hotel
