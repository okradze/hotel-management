import getHotelId from '../../utils/getHotelId'

export default function guests(
    parent,
    { data: { query, orderBy } },
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
}
