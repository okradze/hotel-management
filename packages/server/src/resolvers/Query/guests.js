import Guest from '../../models/Guest'
import getHotelId from '../../utils/getHotelId'

export default async function guests(
    parent,
    { data: { query, limit } },
    { req },
) {
    const hotelId = getHotelId({ req })

    const splittedQuery = `(${query.replace(' ', '|')})`

    return await Guest.find({
        hotel: hotelId,
        name: { $regex: new RegExp(splittedQuery, 'i') },
    }).limit(limit)
}
