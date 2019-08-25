import gql from 'graphql-tag'

export const GET_GUESTS = gql`
    query Guests($query: String!, $limit: Int!) {
        guests(data: { query: $query, limit: $limit }) {
            _id
            name
        }
    }
`

export const GET_ROOMS = gql`
    query Rooms($query: String, $limit: Int!) {
        rooms(data: { query: $query, limit: $limit }) {
            _id
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
            _id
            guest {
                name
                phone
            }
            checkIn
            checkOut
        }
    }
`
