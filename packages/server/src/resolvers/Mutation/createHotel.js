import { createHotelSchema } from '@hb/common'
import generateToken from '../../utils/generateToken'
import hashPassword from '../../utils/hashPassword'
import setCookie from '../../utils/setCookie'

export default async function createHotel(
    parent,
    { data },
    { prisma, res },
    info,
) {
    try {
        createHotelSchema.validateSync(data, {
            abortEarly: false,
            strict: true,
        })

        const password = await hashPassword(data.password)

        // create hotel
        const hotel = await prisma.mutation.createHotel(
            {
                data: {
                    ...data,
                    password,
                },
            },
            info,
        )

        const token = generateToken(hotel.id)

        setCookie({ res }, token)

        return hotel
    } catch (e) {
        if (
            e.message ===
            'A unique constraint would be violated on Hotel. Details: Field name = phone'
        ) {
            throw new Error('Phone taken')
        }
        if (
            e.message ===
            'A unique constraint would be violated on Hotel. Details: Field name = email'
        ) {
            throw new Error('Email taken')
        }
        throw new Error('Unable to register')
    }
}
