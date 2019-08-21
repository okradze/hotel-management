import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Context } from '../context/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(Context)

    return (
        <Route
            {...rest}
            component={props =>
                user ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    )
}

export default PrivateRoute
