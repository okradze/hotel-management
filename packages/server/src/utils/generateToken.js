import jwt from 'jsonwebtoken'

const generateToken = hotelId => {
    return jwt.sign({ hotelId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })
}

export { generateToken as default }
