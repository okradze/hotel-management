import getHotelId from '../../utils/getHotelId'

export default async function dashboardData(
    parent,
    { data: { startDate, skip, first } },
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
}
