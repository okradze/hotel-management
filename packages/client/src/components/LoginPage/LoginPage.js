import React, { useState } from 'react'
import './LoginPage.scss'

const LoginForm = React.lazy(() => import('./LoginForm'))
const SignupForm = React.lazy(() => import('./SignupForm'))

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <React.Suspense fallback={<p />}>
            {isLogin ? (
                <LoginForm setIsLogin={setIsLogin} />
            ) : (
                <SignupForm setIsLogin={setIsLogin} />
            )}
        </React.Suspense>
    )
}

export default LoginPage
