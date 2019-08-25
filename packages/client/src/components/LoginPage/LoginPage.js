import React from 'react'
import './LoginPage.scss'

const LoginForm = React.lazy(() => import('../LoginForm/LoginForm'))
const SignupForm = React.lazy(() => import('../SignupForm/SignupForm'))

const LoginPage = () => {
    const [isLogin, setIsLogin] = React.useState(true)

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
