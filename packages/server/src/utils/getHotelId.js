import jwt from 'jsonwebtoken'

const getHotelId = (request, requiredAuth = true) => {
    const token = request.request.cookies.token

    if (token) {
        return jwt.verify(token, process.env.JWT_SECRET).hotelId
    }

    if (requiredAuth) {
        throw new Error('Authentication required')
    }

    return null
}

export { getHotelId as default }
