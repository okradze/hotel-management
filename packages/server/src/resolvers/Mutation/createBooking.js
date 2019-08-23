import { createBookingSchema } from '@hb/common'
import getHotelId from '../../utils/getHotelId'
import Guest from '../../models/Guest'
import Room from '../../models/Room'
import Booking from '../../models/Booking'

export default async function createBooking(parent, { data }, { req }) {
    try {
        const hotelId = getHotelId({ req })

        createBookingSchema.validateSync(
            {
                ...data,
                checkIn: new Date(data.checkIn),
                checkOut: new Date(data.checkOut),
            },
            {
                abortEarly: false,
                strict: true,
            },
        )

        const roomExists = await Room.exists({
            _id: data.room,
            hotel: hotelId,
        })

        if (!roomExists) {
            throw new Error('Room not found')
        }

        const guestExists = await Guest.exists({
            _id: data.guest,
            hotel: hotelId,
        })

        if (!guestExists) {
            throw new Error('Guest not found')
        }

        const bookingExistsWithSameDates = await Booking.exists({
            $or: [
                {
                    checkIn: {
                        $gte: data.checkIn,
                    },
                    checkOut: {
                        $lte: data.checkIn,
                    },
                },
                {
                    checkIn: {
                        $gte: data.checkOut,
                    },
                    checkOut: {
                        $lte: data.checkIn,
                    },
                },
                {
                    checkIn: {
                        $lte: data.checkIn,
                    },
                    checkOut: {
                        $gte: data.checkOut,
                    },
                },
            ],
        })

        if (bookingExistsWithSameDates) {
            throw new Error('Booking exists with same date')
        }

        const booking = new Booking({
            ...data,
            hotel: hotelId,
        })

        return await booking.save()
    } catch (e) {
        throw new Error('Unable to create booking')
    }
}
