import getHotelId from '../../utils/getHotelId'
import getDatesFromRange from '../../utils/getDatesFromRange'

export default async function revenueData(
    parent,
    { startDate },
    { prisma, req },
) {
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
}
