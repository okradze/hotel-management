import gql from 'graphql-tag'

export const GET_GUESTS = gql`
    query Guests($query: String, $orderBy: GuestOrderByInput) {
        guests(data: { query: $query, orderBy: $orderBy }) {
            id
            name
        }
    }
`

export const GET_ROOMS = gql`
    query Rooms($query: String, $orderBy: RoomOrderByInput) {
        rooms(data: { query: $query, orderBy: $orderBy }) {
            id
            rate
            roomNumber
            type
        }
    }
`
export const CREATE_BOOKING = gql`
    mutation CreateBooking(
        $guest: ID!
        $room: ID!
        $checkIn: String!
        $checkOut: String!
        $color: String!
    ) {
        createBooking(
            data: {
                guest: $guest
                room: $room
                checkIn: $checkIn
                checkOut: $checkOut
                color: $color
            }
        ) {
            id
            guest {
                name
                phone
            }
            checkIn
            checkOut
        }
    }
`
