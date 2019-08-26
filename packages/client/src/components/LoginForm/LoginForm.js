import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'
import { Context } from '../../context/AuthContext'
import { LOGIN } from '../LoginPage/gql'
import Input from '../Input/Input'
import withLoader from '../Loader'

export const LoginForm = ({ history, setIsLogin }) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const { setUser } = React.useContext(Context)

    const [login, { loading }] = useMutation(LOGIN, {
        variables: {
            email,
            password,
        },
        onCompleted: handleCompleted,
        onError: err => {
            if (err.message.endsWith('no_user')) {
                setError('მომხმარებელი არ მოიძებნა')
            }
        },
    })

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (
            email.length >= 1 &&
            email.length <= 100 &&
            password.length >= 1 &&
            password.length <= 64
        ) {
            login()
        }
    }

    function handleCompleted({ login }) {
        if (login) {
            setUser({ createdAt: login.createdAt })
            history.push('/dashboard')
        }
    }

    const ButtonWithLoader = withLoader(() => 'შესვლა')

    return (
        <div className="LoginPage-wrapper">
            <div className="LoginPage-form">
                <form onSubmit={e => handleSubmit(e)} className="LoginForm">
                    <Input
                        text="ელ-ფოსტა:"
                        value={email}
                        onChange={handleEmailChange}
                        type="text"
                        id="email"
                    />
                    <Input
                        text="პაროლი:"
                        value={password}
                        onChange={handlePasswordChange}
                        type="password"
                        id="password"
                    />

                    {error && <p className="LoginForm__error error">{error}</p>}

                    <button type="submit" className="button button--secondary">
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
                    რეგისტრაცია
                </button>
            </div>
        </div>
    )
}

export default withRouter(LoginForm)
