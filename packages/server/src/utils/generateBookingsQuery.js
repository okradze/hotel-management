const generateBookingsQuery = (startDate, endDate) => ({
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

export default generateBookingsQuery
