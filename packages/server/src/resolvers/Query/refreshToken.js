import generateToken from '../../utils/generateToken'
import setCookie from '../../utils/setCookie'

export default async function refreshToken(
    parent,
    args,
    { req, res, prisma },
    info,
) {
    const hotelId = getHotelId({ req })

    const hotel = await prisma.query.hotel(
        {
            where: { id: hotelId },
        },
        info,
    )

    const token = generateToken(hotel.id)
    setCookie({ res }, token)

    return hotel
}
