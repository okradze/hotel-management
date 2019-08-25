import guests from './Query/guests'
import refreshToken from './Query/refreshToken'
import guestsCount from './Query/guestsCount'
import revenueData from './Query/revenueData'
import rooms from './Query/rooms'
import roomsCount from './Query/roomsCount'
import createBooking from './Mutation/createBooking'
import createGuest from './Mutation/createGuest'
import createRoom from './Mutation/createRoom'
import createHotel from './Mutation/createHotel'
import login from './Mutation/login'
import logout from './Mutation/logout'
import Room from './Room'
import Booking from './Booking'

const resolvers = {
    Query: {
        guests,
        guestsCount,
        revenueData,
        rooms,
        roomsCount,
        refreshToken,
    },
    Mutation: {
        createHotel,
        createRoom,
        createGuest,
        createBooking,
        login,
        logout,
    },
    Room,
    Booking,
}

export { resolvers as default }
