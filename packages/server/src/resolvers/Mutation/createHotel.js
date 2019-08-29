import { createHotelSchema } from '@hb/common'
import { UserInputError } from 'apollo-server-express'
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
        if (e.inner) {
            const errors = []

            e.inner.forEach(({ path, message }) => {
                errors.push({
                    [path]: [message],
                })
            })

            throw new UserInputError('invalid_input', errors)
        }
        if (e.code === 11000) {
            const keys = Object.keys(e.keyPattern)
            throw new Error(`${keys[0]}_taken`)
        }
    }
}
