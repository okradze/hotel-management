import gql from 'graphql-tag'

const REFRESH_TOKEN = gql`
    query {
        refreshToken
    }
`

export default REFRESH_TOKEN
