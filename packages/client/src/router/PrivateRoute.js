import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Context } from '../context/AuthContext'
import Header from '../components/Header'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuth } = useContext(Context)

    return (
        <Route
            {...rest}
            component={props =>
                isAuth ? (
                    <div className="App">
                        <Header />
                        <Component {...props} />
                    </div>
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    )
}

export default PrivateRoute
