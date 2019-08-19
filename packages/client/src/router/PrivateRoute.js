import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Context } from '../context/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuth } = useContext(Context)

    return (
        <Route
            {...rest}
            component={props =>
                isAuth ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    )
}

export default PrivateRoute
