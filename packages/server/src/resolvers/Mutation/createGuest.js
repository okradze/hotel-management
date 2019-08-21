import { createGuestSchema } from '@hb/common'
import getHotelId from '../../utils/getHotelId'

export default async function createGuest(
    parent,
    { data },
    { prisma, req },
    info,
) {
    try {
        createGuestSchema.validateSync(data, {
            abortEarly: false,
            strict: true,
        })
        const hotelId = getHotelId({ req })

        return prisma.mutation.createGuest(
            {
                data: {
                    ...data,
                    hotel: {
                        connect: {
                            id: hotelId,
                        },
                    },
                },
            },
            info,
        )
    } catch (e) {
        throw new Error('Unable to create guest')
    }
}
