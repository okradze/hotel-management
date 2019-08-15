import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Context } from '../../context/AuthContext'
import Loader from '../Loader'
import REFRESH_TOKEN from './gql'

const Auth = ({ history }) => {
    const { setIsAuth } = useContext(Context)
    useQuery(REFRESH_TOKEN, {
        onError: () => {
            history.push('/login')
        },
        onCompleted: handleCompleted,
    })
    function handleCompleted(data) {
        if (data.refreshToken === true) {
            setIsAuth(true)
            history.push('/dashboard')
        }
    }

    return (
        <div className="loader-full">
            <Loader />
        </div>
    )
}

export default withRouter(Auth)
