import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Context } from '../context/AuthContext'

const NotFound = () => {
    const { isAuth } = useContext(Context)

    return (
        <Route
            component={props =>
                isAuth ? <Redirect to="/dashboard" /> : <Redirect to="/" />
            }
        />
    )
}

export default NotFound
