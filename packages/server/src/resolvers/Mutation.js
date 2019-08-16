import bcrypt from 'bcryptjs'
import getHotelId from '../utils/getHotelId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'
import setCookie from '../utils/setCookie'
import {
    createBookingSchema,
    createGuestSchema,
    createHotelSchema,
    createRoomSchema,
} from '@hb/common'

const Mutation = {
    logout(parent, args, { request }) {
        getHotelId(request)

        request.response.cookie('token', '', {
            expires: new Date(0),
        })
        return true
    },
    async login(parent, { data }, { prisma, request }) {
        // check if user exists with email

        const hotel = await prisma.query.hotel({
            where: { email: data.email },
        })

        if (!hotel) {
            throw new Error('Unable to login')
        }

        // check if password is correct

        const isMatch = await bcrypt.compare(data.password, hotel.password)

        if (!isMatch) {
            throw new Error('Unable to login')
        }

        const token = generateToken(hotel.id)

        setCookie(request, token)

        return true
    },
    createHotel: {
        resolve: async (parent, { data }, { prisma, request }) => {
            try {
                createHotelSchema.validateSync(data, {
                    abortEarly: false,
                    strict: true,
                })

                const password = await hashPassword(data.password)

                // create hotel
                const hotel = await prisma.mutation.createHotel({
                    data: {
                        ...data,
                        password,
                    },
                })

                const token = generateToken(hotel.id)

                setCookie(request, token)

                return true
            } catch (e) {
                throw new Error('Unable to register')
            }
        },
    },
    async createRoom(parent, { data }, { prisma, request }, info) {
        try {
            createRoomSchema.validateSync(data, {
                abortEarly: false,
                strict: true,
            })

            const hotelId = getHotelId(request)

            return prisma.mutation.createRoom(
                {
                    data: {
                        ...data,
                        hotel: {
                            connect: {
                                id: hotelId,
                            },
                        },
                    },
                },
                info,
            )
        } catch (e) {
            throw new Error('Unable to create room')
        }
    },
    async createGuest(parent, { data }, { prisma, request }, info) {
        try {
            createGuestSchema.validateSync(data, {
                abortEarly: false,
                strict: true,
            })
            const hotelId = getHotelId(request)

            return prisma.mutation.createGuest(
                {
                    data: {
                        ...data,
                        hotel: {
                            connect: {
                                id: hotelId,
                            },
                        },
                    },
                },
                info,
            )
        } catch (e) {
            throw new Error('Unable to create guest')
        }
    },
    async createBooking(parent, { data }, { prisma, request }, info) {
        try {
            createBookingSchema.validateSync(data, {
                abortEarly: false,
                strict: true,
            })

            const hotelId = getHotelId(request)

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
    },
}

export { Mutation as default }
