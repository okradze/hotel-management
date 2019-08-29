import Guest from '../../models/Guest'
import getHotelId from '../../utils/getHotelId'

export default async function guestsCount(parent, args, { req }) {
    const hotelId = getHotelId({ req })

    return await Guest.countDocuments({ hotel: hotelId })
}
