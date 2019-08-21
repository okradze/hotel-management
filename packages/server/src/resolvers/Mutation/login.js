import bcrypt from 'bcryptjs'
import parseInfo from '../../utils/parseInfo'
import setCookie from '../../utils/setCookie'
import generateToken from '../../utils/generateToken'

export default async function login(parent, { data }, { prisma, res }, info) {
    // query user by email

    const hotel = await prisma.query.hotel(
        {
            where: { email: data.email },
        },
        parseInfo(info, 'password'),
    )

    if (!hotel) {
        throw new Error('Unable to login')
    }

    // check if password is correct

    const isMatch = await bcrypt.compare(data.password, hotel.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    const token = generateToken(hotel.id)

    setCookie({ res }, token)

    return hotel
}
