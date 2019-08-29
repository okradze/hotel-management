import Booking from '../models/Booking'
import generateBookingsQuery from '../utils/generateBookingsQuery'

const Room = {
    async bookings({ _id }, { startDate }) {
        // month end
        const endDate = new Date(
            new Date(startDate).getFullYear(),
            new Date(startDate).getMonth() + 1,
            0,
            0,
            0,
            0,
            0,
        ).toISOString()

        const query = generateBookingsQuery(startDate, endDate)

        return await Booking.find({ room: _id, ...query })
    },
}

export default Room
