import React from 'react'
import './AuthPage.scss'

const LoginForm = React.lazy(() => import('../LoginForm/LoginForm'))
const SignupForm = React.lazy(() => import('../SignupForm/SignupForm'))

const AuthPage = () => {
    const [isLogin, setIsLogin] = React.useState(true)

    return (
        <React.Suspense fallback={<p />}>
            <div className="AuthPage-wrapper">
                <div className="AuthPage-form">
                    {isLogin ? (
                        <LoginForm setIsLogin={setIsLogin} />
                    ) : (
                        <SignupForm setIsLogin={setIsLogin} />
                    )}
                </div>
            </div>
        </React.Suspense>
    )
}

export default AuthPage
