import Hotel from '../../models/Hotel'
import getHotelId from '../../utils/getHotelId'
import generateToken from '../../utils/generateToken'
import setCookie from '../../utils/setCookie'

export default async function refreshToken(parent, args, { req, res }) {
    const hotelId = getHotelId({ req })

    const hotel = await Hotel.findById(hotelId)

    const token = generateToken(hotelId)

    setCookie({ res }, token)

    return hotel
}
