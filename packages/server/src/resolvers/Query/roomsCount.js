import Room from '../../models/Room'
import getHotelId from '../../utils/getHotelId'

export default async function roomsCount(parent, args, { prisma, req }) {
    const hotelId = getHotelId({ req })

    return await Room.countDocuments({ hotel: hotelId })
}
