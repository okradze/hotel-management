import bcrypt from 'bcryptjs'
import setCookie from '../../utils/setCookie'
import generateToken from '../../utils/generateToken'
import Hotel from '../../models/Hotel'

export default async function login(parent, { data }, { res }) {
    // query user by email

    const hotel = await Hotel.findOne({ email: data.email })

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
