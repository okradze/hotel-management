import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Context } from '../context/AuthContext'

const PublicRoute = ({ component: Component, ...rest }) => {
    const { user } = React.useContext(Context)

    return (
        <Route
            {...rest}
            component={props =>
                user ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    )
}

export default PublicRoute
