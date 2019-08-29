import gql from 'graphql-tag'

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(data: { email: $email, password: $password }) {
            createdAt
        }
    }
`

export const SIGNUP = gql`
    mutation signup(
        $email: String!
        $password: String!
        $name: String!
        $phone: String!
    ) {
        createHotel(
            data: {
                name: $name
                phone: $phone
                email: $email
                password: $password
            }
        ) {
            createdAt
        }
    }
`
