import mongoose from 'mongoose'
import { createHotelSchema } from '@hb/common'
import validateField from '../utils/validateField'

const Hotel = mongoose.Schema(
    {
        id: {
            required: true,
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator(value) {
                    validateField(createHotelSchema, 'email', value)
                },
            },
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            validate: {
                validator(value) {
                    validateField(createHotelSchema, 'phone', value)
                },
            },
            unique: true,
        },
        name: {
            type: String,
            required: true,
            validate: {
                validator(value) {
                    validateField(createHotelSchema, 'name', value)
                },
            },
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator(value) {
                    validateField(createHotelSchema, 'password', value)
                },
            },
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    },
)

export default Hotel
