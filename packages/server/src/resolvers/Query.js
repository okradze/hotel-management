import getHotelId from '../utils/getHotelId'
import generateToken from '../utils/generateToken'
import setCookie from '../utils/setCookie'
import getDatesFromRange from '../utils/getDatesFromRange'

const Query = {
    async revenueData(parent, args, { prisma, req, res }) {
        const hotelId = getHotelId({ req, res })

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
    async roomsCount(parent, args, { prisma, req, res }) {
        const hotelId = getHotelId({ req, res })

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
    async guestsCount(parent, args, { prisma, req, res }) {
        const hotelId = getHotelId({ req, res })

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
    refreshToken(parent, args, { req, res }) {
        const hotelId = getHotelId({ req, res })
        const token = generateToken(hotelId)

        setCookie({ req, res }, token)

        return true
    },
    bookings(
        parent,
        {
            data: { startDate, orderBy, roomId },
        },
        { prisma, req, res },
        info,
    ) {
        const hotelId = getHotelId({ req, res })

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
    rooms(
        parent,
        {
            data: { query, orderBy, first },
        },
        { prisma, req, res },
        info,
    ) {
        const hotelId = getHotelId({ req, res })

        const opArgs = {
            where: {
                hotel: {
                    id: hotelId,
                },
            },
        }

        if (query) {
            opArgs.where.OR = [
                {
                    type_contains: query,
                },
                {
                    roomNumber_contains: query,
                },
            ]
        }

        if (orderBy) {
            opArgs.orderBy = orderBy
        }
        if (first) {
            opArgs.first = first
        }

        return prisma.query.rooms(opArgs, info)
    },
    guests(
        parent,
        {
            data: { query, orderBy },
        },
        { prisma, req, res },
        info,
    ) {
        const hotelId = getHotelId({ req, res })

        const opArgs = {
            where: {
                hotel: {
                    id: hotelId,
                },
            },
            first: 6,
        }

        if (query) {
            opArgs.where.name_contains = query
        }

        if (orderBy) {
            opArgs.orderBy = orderBy
        }

        return prisma.query.guests(opArgs, info)
    },
}

export { Query as default }
