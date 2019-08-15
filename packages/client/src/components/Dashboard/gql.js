import gql from 'graphql-tag'

const GET_DASHBOARD_DATA = gql`
    query(
        $startDate: String!
        $bookingsOrderBy: BookingOrderByInput
        $roomsOrderBy: RoomOrderByInput
    ) {
        bookings(data: { startDate: $startDate, orderBy: $bookingsOrderBy }) {
            id
            guest {
                name
                phone
            }
            color
            room {
                id
                roomNumber
            }
            checkIn
            checkOut
        }
        rooms(data: { orderBy: $roomsOrderBy }) {
            id
            roomNumber
        }
    }
`

export default GET_DASHBOARD_DATA
