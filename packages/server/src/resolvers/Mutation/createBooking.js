import { createBookingSchema } from '@hb/common'
import getHotelId from '../../utils/getHotelId'

export default async function createBooking(
    parent,
    { data },
    { prisma, req },
    info,
) {
    try {
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

        const hotelId = getHotelId({ req })

        const roomExists = await prisma.exists.Room({
            id: data.room,
            hotel: {
                id: hotelId,
            },
        })

        if (!roomExists) {
            throw new Error('Room not found')
        }

        const guestExists = await prisma.exists.Guest({
            id: data.guest,
            hotel: {
                id: hotelId,
            },
        })

        if (!guestExists) {
            throw new Error('Guest not found')
        }

        return prisma.mutation.createBooking(
            {
                data: {
                    checkIn: data.checkIn,
                    checkOut: data.checkOut,
                    color: data.color,
                    hotel: {
                        connect: {
                            id: hotelId,
                        },
                    },
                    room: {
                        connect: {
                            id: data.room,
                        },
                    },
                    guest: {
                        connect: {
                            id: data.guest,
                        },
                    },
                },
            },
            info,
        )
    } catch (e) {
        throw new Error('Unable to create booking')
    }
}
