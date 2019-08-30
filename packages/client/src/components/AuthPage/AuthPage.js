import React from 'react'
import AuthPageContainer from './AuthPageContainer'
import './AuthPage.scss'

const AuthPage = () => (
    <React.Suspense fallback={<p />}>
        <div className="AuthPage">
            <AuthPageContainer />
        </div>
    </React.Suspense>
)

export default AuthPage
