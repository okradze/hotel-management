import createBooking from './createBooking'
import createGuest from './createGuest'
import createRoom from './createRoom'
import createHotel from './createHotel'
import login from './login'
import logout from './logout'

const Mutation = {
    createHotel,
    createRoom,
    createGuest,
    createBooking,
    login,
    logout,
}

export default Mutation
