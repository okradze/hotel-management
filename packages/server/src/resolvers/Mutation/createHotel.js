import { createHotelSchema } from '@hb/common'
import generateToken from '../../utils/generateToken'
import hashPassword from '../../utils/hashPassword'
import setCookie from '../../utils/setCookie'
import Hotel from '../../models/Hotel'

export default async function createHotel(parent, { data }, { res }) {
    try {
        createHotelSchema.validateSync(data, {
            abortEarly: false,
            strict: true,
        })

        const password = await hashPassword(data.password)

        // create hotel
        const hotel = new Hotel({
            ...data,
            password,
        })

        const newHotel = await hotel.save()

        const token = generateToken(hotel.id)

        setCookie({ res }, token)

        return newHotel
    } catch (e) {
        throw new Error('Unable to register')
    }
}
