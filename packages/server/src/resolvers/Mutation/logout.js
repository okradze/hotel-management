import getHotelId from '../../utils/getHotelId'

export default function logout(parent, args, { req, res }) {
    getHotelId({ req })

    res.cookie('token', '', {
        expires: new Date(0),
    })

    return true
}
