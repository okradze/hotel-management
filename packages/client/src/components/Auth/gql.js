import gql from 'graphql-tag'

const REFRESH_TOKEN = gql`
    query {
        refreshToken {
            createdAt
        }
    }
`

export default REFRESH_TOKEN
