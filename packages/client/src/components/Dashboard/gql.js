import gql from 'graphql-tag'

const GET_DASHBOARD_DATA = gql`
    query($startDate: String!, $limit: Int!, $skip: Int!) {
        rooms(data: { limit: $limit, skip: $skip }) {
            _id
            roomNumber
            bookings(startDate: $startDate) {
                guest {
                    name
                    phone
                }
                color
                checkIn
                checkOut
            }
        }
    }
`

export default GET_DASHBOARD_DATA
