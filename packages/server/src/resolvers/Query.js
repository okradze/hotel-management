import getHotelId from '../utils/getHotelId'
import generateToken from '../utils/generateToken'
import setCookie from '../utils/setCookie'
import getDatesFromRange from '../utils/getDatesFromRange'

const Query = {
    async dashboardData(
        parent,
        {
            data: { startDate, skip, first },
        },
        { prisma, req },
        info,
    ) {
        const hotelId = getHotelId({ req })

        return prisma.query.rooms(
            {
                where: {
                    hotel: {
                        id: hotelId,
                    },
                },
                orderBy: 'roomNumber_ASC',
                first,
                skip,
            },
            info,
        )
    },
    async revenueData(parent, args, { prisma, req }) {
        const hotelId = getHotelId({ req })

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
    async roomsCount(parent, args, { prisma, req }) {
        const hotelId = getHotelId({ req })

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
    async guestsCount(parent, args, { prisma, req }) {
        const hotelId = getHotelId({ req })

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
        const hotelId = getHotelId({ req })
        const token = generateToken(hotelId)

        setCookie({ req, res }, token)

        return true
    },
    bookings(
        parent,
        {
            data: { orderBy },
        },
        { prisma, req },
        info,
    ) {
        const hotelId = getHotelId({ req })

        const opArgs = {
            where: {
                hotel: {
                    id: hotelId,
                },
            },
            orderBy,
        }

        return prisma.query.bookings(opArgs, info)
    },
    rooms(
        parent,
        {
            data: { query, orderBy, first },
        },
        { prisma, req },
        info,
    ) {
        const hotelId = getHotelId({ req })

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
                    roomNumber: Number.parseInt(query, 10),
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
        { prisma, req },
        info,
    ) {
        const hotelId = getHotelId({ req })

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
