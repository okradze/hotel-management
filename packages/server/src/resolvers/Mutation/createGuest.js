import { createGuestSchema } from '@hb/common'
import getHotelId from '../../utils/getHotelId'
import Guest from '../../models/Guest'

export default async function createGuest(parent, { data }, { req }) {
    try {
        const hotelId = getHotelId({ req })

        createGuestSchema.validateSync(data, {
            abortEarly: false,
            strict: true,
        })

        const guest = new Guest({
            ...data,
            hotel: hotelId,
        })

        const newGuest = await guest.save()

        return newGuest
    } catch (e) {
        throw new Error('Unable to create guest')
    }
}
