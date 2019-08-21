import getHotelId from '../../utils/getHotelId'

export default async function guestsCount(parent, args, { prisma, req }) {
    const hotelId = getHotelId({ req })

    const { aggregate } = await prisma.query.guestsConnection(
        {
            where: {
                hotel: {
                    id: hotelId,
                },
            },
        },
        `{ aggregate {count }}`,
    )

    return aggregate.count
}
