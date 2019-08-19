import { AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'

const getHotelId = ({ req }, requiredAuth = true) => {
    const token = req.cookies.token

    if (token) {
        return jwt.verify(token, process.env.JWT_SECRET).hotelId
    }

    if (requiredAuth) {
        throw new AuthenticationError('Authentication required')
    }

    return null
}

export { getHotelId as default }
