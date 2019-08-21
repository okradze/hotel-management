import getHotelId from '../../utils/getHotelId'

export default function rooms(
    parent,
    { data: { query, orderBy, first } },
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
}
