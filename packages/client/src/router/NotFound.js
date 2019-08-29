import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Context } from '../context/AuthContext'

const NotFound = () => {
    const { isAuth } = React.useContext(Context)

    return (
        <Route
            component={() =>
                isAuth ? <Redirect to="/dashboard" /> : <Redirect to="/" />
            }
        />
    )
}

export default NotFound
