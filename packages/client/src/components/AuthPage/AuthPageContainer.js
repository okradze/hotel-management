import React, { lazy, Suspense } from 'react'

const LoginForm = lazy(() => import('../LoginForm/LoginForm'))
const SignupForm = lazy(() => import('../SignupForm/SignupForm'))

const AuthPageContainer = () => {
    const [isLoginForm, setIsLoginForm] = React.useState(true)

    return (
        <Suspense fallback={<p />}>
            <div className="AuthPage-form">
                {isLoginForm ? (
                    <LoginForm setIsLogin={setIsLoginForm} />
                ) : (
                    <SignupForm setIsLogin={setIsLoginForm} />
                )}
            </div>
        </Suspense>
    )
}

export default AuthPageContainer
