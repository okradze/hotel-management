import { UserInputError } from 'apollo-server-express'
import { createBookingSchema } from '@hb/common'
import getHotelId from '../../utils/getHotelId'
import Guest from '../../models/Guest'
import Room from '../../models/Room'
import Booking from '../../models/Booking'

export default async function createBooking(parent, { data }, { req, pubsub }) {
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
            throw new UserInputError('no_room')
        }

        const guestExists = await Guest.exists({
            _id: data.guest,
            hotel: hotelId,
        })

        if (!guestExists) {
            throw new UserInputError('no_guest')
        }

        const bookingExistsWithSameDates = await Booking.exists({
            $or: [
                {
                    checkIn: {
                        $lte: data.checkIn,
                    },
                    checkOut: {
                        $gte: data.checkIn,
                    },
                },
                {
                    checkIn: {
                        $lte: data.checkOut,
                    },
                    checkOut: {
                        $gte: data.checkOut,
                    },
                },
                {
                    checkIn: {
                        $gte: data.checkIn,
                    },
                    checkOut: {
                        $lte: data.checkOut,
                    },
                },
            ],
        })

        if (bookingExistsWithSameDates) {
            throw new Error('booking_exists')
        }

        const booking = await new Booking({
            ...data,
            hotel: hotelId,
        }).save()

        pubsub.publish(`booking:${hotelId}`, {
            booking: {
                mutation: 'CREATED',
                node: booking,
            },
        })

        return booking
    } catch (e) {
        console.log(e)
        throw new Error('Unable to create booking')
    }
}
