import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'
import { Context } from '../../context/AuthContext'
import Loader from '../Loader/Loader'
import { LOGIN } from './gql'
import Input from '../Input'

const LoginForm = ({ history, setIsLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setIsAuth } = useContext(Context)
    const [login, { error, loading }] = useMutation(LOGIN, {
        variables: {
            email,
            password,
        },
        onCompleted: handleCompleted,
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
            email.length <= 50 &&
            password.length >= 1 &&
            password.length <= 50
        ) {
            login()
        }
    }

    function handleCompleted(data) {
        if (data.login === true) {
            setIsAuth(true)
            history.push('/dashboard')
        }
    }

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

                    {error && (
                        <p className="LoginForm__error error">
                            მომხმარებელი არ მოიძებნა
                        </p>
                    )}
                    <button type="submit" className="button button--secondary">
                        {loading ? (
                            <>
                                <Loader />
                            </>
                        ) : (
                            'შესვლა'
                        )}
                    </button>
                </form>
                <div>
                    <p
                        role="link"
                        tabIndex="0"
                        onKeyPress={e => {
                            if (e.which === 13) {
                                setIsLogin(false)
                            }
                        }}
                        onClick={() => setIsLogin(false)}
                        className="form-link"
                    >
                        რეგისტრაცია
                    </p>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LoginForm)
