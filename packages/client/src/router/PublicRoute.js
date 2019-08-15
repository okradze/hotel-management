import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Context } from '../context/AuthContext'

const PublicRoute = ({ component: Component, ...rest }) => {
    const { isAuth } = useContext(Context)

    return (
        <Route
            {...rest}
            component={props =>
                isAuth ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    )
}

export default PublicRoute
