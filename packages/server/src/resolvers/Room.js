import Booking from '../models/Booking'

const Room = {
    async bookings(parent, { startDate }) {
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

        return await Booking.find({
            $or: [
                {
                    $and: [
                        {
                            checkIn: {
                                $gte: startDate,
                            },
                        },
                        {
                            checkIn: {
                                $lte: endDate,
                            },
                        },
                    ],
                },
                {
                    $and: [
                        {
                            checkOut: {
                                $gte: startDate,
                            },
                        },
                        {
                            checkOut: {
                                $lte: endDate,
                            },
                        },
                    ],
                },
                {
                    checkIn: {
                        $lte: startDate,
                    },
                    checkOut: {
                        $gte: endDate,
                    },
                },
            ],
        })
    },
}

export default Room
