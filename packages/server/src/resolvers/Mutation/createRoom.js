import { createRoomSchema } from '@hb/common'
import getHotelId from '../../utils/getHotelId'
import Room from '../../models/Room'

export default async function createRoom(parent, { data }, { req }) {
    try {
        const hotelId = getHotelId({ req })

        createRoomSchema.validateSync(data, {
            abortEarly: false,
            strict: true,
        })

        const room = new Room({
            ...data,
            hotel: hotelId,
        })

        const newRoom = await room.save()
        return newRoom
    } catch (e) {
        throw new Error('Unable to create room')
    }
}
