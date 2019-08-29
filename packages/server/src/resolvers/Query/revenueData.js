import Booking from '../../models/Booking'
import getHotelId from '../../utils/getHotelId'
import getDatesFromRange from '../../utils/getDatesFromRange'
import generateBookingsQuery from '../../utils/generateBookingsQuery'

export default async function revenueData(parent, { startDate }, { req }) {
    const hotelId = getHotelId({ req })

    // end of year
    const endDate = new Date(startDate + 1, 0, 0, 0, 0, 0, 0).toISOString()

    // generate query that gets bookings
    const query = generateBookingsQuery(
        new Date(startDate, 0, 0, 0, 0, 0, 0).toISOString(),
        endDate,
    )

    const bookings = await Booking.find({ hotel: hotelId, ...query })
        .populate('room')
        .exec()

    const monthsInYear = 12
    const initialRevenue = 0

    const data = new Array(monthsInYear).fill(initialRevenue)

    bookings.forEach(({ room, checkIn, checkOut }) => {
        const dates = getDatesFromRange(checkIn, checkOut)

        dates.forEach(date => {
            const dateObj = new Date(date)

            // if date's year equals to current year then add to array
            if (dateObj.getFullYear() === startDate) {
                const monthNum = dateObj.getMonth()

                data[monthNum] = data[monthNum] + room.rate
            }
        })
    })

    return data
}
