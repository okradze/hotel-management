import { createBookingSchema } from '@hb/common'
import getHotelId from '../../utils/getHotelId'
import Guest from '../../models/Guest'
import Room from '../../models/Room'
import Booking from '../../models/Booking'

export default async function createBooking(parent, { data }, { req }, info) {
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
            id: data.room,
            hotel: hotelId,
        })

        if (!roomExists) {
            throw new Error('Room not found')
        }

        const guestExists = await Guest.exists({
            id: data.guest,
            hotel: hotelId,
        })

        if (!guestExists) {
            throw new Error('Guest not found')
        }

        const booking = new Booking({
            ...data,
            hotel: hotelId,
        })

        const newBooking = await booking.save()

        return newBooking
    } catch (e) {
        throw new Error('Unable to create booking')
    }
}
