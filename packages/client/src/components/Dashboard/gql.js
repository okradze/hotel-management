import gql from 'graphql-tag'

const GET_DASHBOARD_DATA = gql`
    query($startDate: String!, $first: Int!, $skip: Int!) {
        dashboardData(
            data: { startDate: $startDate, first: $first, skip: $skip }
        ) {
            id
            roomNumber
            bookings {
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
        }
    }
`

export default GET_DASHBOARD_DATA
