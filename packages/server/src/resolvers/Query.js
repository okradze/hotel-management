import getHotelId from '../utils/getHotelId'
import generateToken from '../utils/generateToken'
import setCookie from '../utils/setCookie'
import getDatesFromRange from '../utils/getDatesFromRange'

const Query = {
    async revenueData(parent, args, { prisma, request }) {
        const hotelId = getHotelId(request)

        const bookings = await prisma.query.bookings(
            {
                where: {
                    hotel: {
                        id: hotelId,
                    },
                },
            },
            `{ room { rate } checkIn checkOut }`,
        )

        const monthsInYear = 12

        const data = new Array(monthsInYear).fill(0)

        bookings.forEach(({ room, checkIn, checkOut }) => {
            const dates = getDatesFromRange(checkIn, checkOut)

            dates.forEach(date => {
                const monthNum = new Date(date).getMonth()

                data[monthNum] = data[monthNum] + room.rate
            })
        })

        return data
    },
    async roomsCount(parent, args, { prisma, request }) {
        const hotelId = getHotelId(request)

        const { aggregate } = await prisma.query.roomsConnection(
            {
                where: {
                    hotel: {
                        id: hotelId,
                    },
                },
            },
            `{ aggregate {count }}`,
        )
        return aggregate.count
    },
    async guestsCount(parent, args, { prisma, request }) {
        const hotelId = getHotelId(request)

        const { aggregate } = await prisma.query.guestsConnection(
            {
                where: {
                    hotel: {
                        id: hotelId,
                    },
                },
            },
            `{ aggregate {count }}`,
        )

        return aggregate.count
    },
    refreshToken(parent, args, { request }) {
        const hotelId = getHotelId(request)
        const token = generateToken(hotelId)

        setCookie(request, token)

        return true
    },
    bookings(
        parent,
        {
            data: { startDate, orderBy, roomId },
        },
        { prisma, request },
        info,
    ) {
        const hotelId = getHotelId(request)

        const endDate = new Date(
            new Date(startDate).getFullYear(),
            new Date(startDate).getMonth() + 1,
            1,
        ).toISOString()

        const opArgs = {
            where: {
                OR: [
                    {
                        AND: [
                            {
                                checkIn_gte: startDate,
                            },
                            {
                                checkIn_lte: endDate,
                            },
                        ],
                    },
                    {
                        AND: [
                            {
                                checkOut_gte: startDate,
                            },
                            {
                                checkOut_lte: endDate,
                            },
                        ],
                    },
                    {
                        AND: [
                            {
                                checkIn_lte: startDate,
                            },
                            {
                                checkOut_gte: endDate,
                            },
                        ],
                    },
                ],
                hotel: {
                    id: hotelId,
                },
            },
            orderBy: orderBy,
        }

        if (roomId) {
            opArgs.where.room = {}
            opArgs.where.room.id = roomId
        }

        return prisma.query.bookings(opArgs, info)
    },
    rooms(parent, { data }, { prisma, request }, info) {
        const hotelId = getHotelId(request)

        return prisma.query.rooms(
            {
                where: {
                    type_contains: data.query,
                    hotel: {
                        id: hotelId,
                    },
                },
                orderBy: data.orderBy,
            },
            info,
        )
    },
    guests(parent, { data }, { prisma, request }, info) {
        const hotelId = getHotelId(request)

        return prisma.query.guests(
            {
                where: {
                    name_contains: data.query,
                    hotel: {
                        id: hotelId,
                    },
                },
                orderBy: data.orderBy,
            },
            info,
        )
    },
}

export { Query as default }
