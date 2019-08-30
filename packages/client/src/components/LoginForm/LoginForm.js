import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'
import { Context } from '../../context/AuthContext'
import { LOGIN } from '../AuthPage/gql'
import Input from '../Input/Input'
import withLoader from '../Loader'

export const LoginForm = ({ history, setIsLogin }) => {
    const [loginCredentials, setLoginCredentials] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const { setUser } = useContext(Context)

    const [login, { loading }] = useMutation(LOGIN, {
        variables: loginCredentials,
        onCompleted: handleCompleted,
        onError: err => {
            if (err.message.endsWith('no_user')) {
                setError('მომხმარებელი არ მოიძებნა')
            }
        },
    })

    function handleEmailChange(e) {
        setLoginCredentials({
            ...loginCredentials,
            email: e.target.value,
        })
    }

    function handlePasswordChange(e) {
        setLoginCredentials({
            ...loginCredentials,
            password: e.target.value,
        })
    }

    const isButtonDisabled = () => {
        const { email, password } = loginCredentials

        if (
            email.length >= 1 &&
            email.length <= 100 &&
            password.length >= 1 &&
            password.length <= 64
        ) {
            return false
        }
        return true
    }

    function handleSubmit(e) {
        e.preventDefault()

        login()
    }

    function handleCompleted({ login }) {
        if (login) {
            setUser({ createdAt: login.createdAt })
            history.push('/dashboard')
        }
    }

    const ButtonWithLoader = withLoader(() => 'შესვლა')

    return (
        <>
            <form onSubmit={e => handleSubmit(e)} className="LoginForm">
                <Input
                    text="ელ-ფოსტა"
                    value={loginCredentials.email}
                    onChange={handleEmailChange}
                    type="text"
                    id="email"
                    placeholder="შეიყვანეთ ელ-ფოსტა"
                />
                <Input
                    text="პაროლი"
                    value={loginCredentials.password}
                    onChange={handlePasswordChange}
                    type="password"
                    id="password"
                    placeholder="შეიყვანეთ პაროლი"
                />

                {error && <p className="LoginForm__error error">{error}</p>}

                <button
                    disabled={isButtonDisabled()}
                    type="submit"
                    className="button button--secondary"
                >
                    <ButtonWithLoader isLoading={loading} />
                </button>
            </form>
            <button
                type="button"
                onKeyPress={e => {
                    if (e.which === 13) {
                        setIsLogin(false)
                    }
                }}
                onClick={() => setIsLogin(false)}
                className="button--transparent form-link"
            >
                რეგისტრაცია &rarr;
            </button>
        </>
    )
}

export default withRouter(LoginForm)
