import Room from '../../models/Room'
import getHotelId from '../../utils/getHotelId'

export default async function rooms(parent, { data: { query } }, { req }) {
    const hotelId = getHotelId({ req })

    const opArgs = {
        hotel: hotelId,
    }

    if (query) {
        const parsedNumber = Number.parseInt(query, 10)

        if (parsedNumber) {
            opArgs.roomNumber = parsedNumber
        } else {
            opArgs.type = {
                $regex: new RegExp(query, 'i'),
            }
        }
    }

    return await Room.find(opArgs)
}
