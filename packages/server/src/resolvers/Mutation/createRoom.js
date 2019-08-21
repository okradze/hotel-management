import { createRoomSchema } from '@hb/common'
import getHotelId from '../../utils/getHotelId'

export default async function createRoom(
    parent,
    { data },
    { prisma, req },
    info,
) {
    try {
        createRoomSchema.validateSync(data, {
            abortEarly: false,
            strict: true,
        })

        const hotelId = getHotelId({ req })

        return prisma.mutation.createRoom(
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
        throw new Error('Unable to create room')
    }
}
