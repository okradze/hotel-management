import Guest from '../models/Guest'
import Room from '../models/Room'

const Booking = {
    async guest(parent) {
        return await Guest.findById(parent.guest)
    },
    async room(parent) {
        return await Room.findById(parent.room)
    },
}

export default Booking
