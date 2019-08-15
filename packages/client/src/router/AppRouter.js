import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import NotFound from './NotFound'
import AuthContext from '../context/AuthContext'
import Auth from '../components/Auth'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
    credentials: 'include',
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

const Dashboard = React.lazy(() => import('../components/Dashboard'))
const LoginPage = React.lazy(() => import('../components/LoginPage'))
const Stats = React.lazy(() => import('../components/Stats'))

const AppRouter = () => {
    return (
        <ApolloProvider client={client}>
            <AuthContext>
                <BrowserRouter>
                    <React.Suspense fallback={<p />}>
                        <Switch>
                            <Route path="/" component={Auth} exact />
                            <PrivateRoute
                                path="/dashboard"
                                component={Dashboard}
                                exact
                            />
                            <PublicRoute
                                path="/login"
                                component={LoginPage}
                                exact
                            />
                            <PrivateRoute
                                path="/stats"
                                component={Stats}
                                exact
                            />
                            <NotFound />
                        </Switch>
                    </React.Suspense>
                </BrowserRouter>
            </AuthContext>
        </ApolloProvider>
    )
}

export default AppRouter
