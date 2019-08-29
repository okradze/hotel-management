import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'
import { createHotelSchema } from '@hb/common'
import { Context } from '../../context/AuthContext'
import withLoader from '../Loader/Loader'
import { SIGNUP } from '../AuthPage/gql'
import handleValidate from '../../utils/handleValidate'
import Input from '../Input/Input'
import '../AuthPage/AuthPage.scss'

export const SignupForm = ({ history, setIsLogin }) => {
    const { setUser } = React.useContext(Context)
    const [userCredentials, setUserCredentials] = React.useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    })
    const [errors, setErrors] = React.useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    })

    const [signup, { loading }] = useMutation(SIGNUP, {
        variables: {
            ...userCredentials,
        },
        onCompleted: handleCompleted,
        onError: err => {
            if (
                err.message.endsWith('email_taken') ||
                err.message.endsWith('phone_taken')
            ) {
                setErrors({
                    ...errors,
                    email: 'მომხმარებელი უკვე არსებობს',
                })
            }
        },
    })

    const handleChange = (e, path) => {
        handleValidate(
            e.target.value,
            setUserCredentials,
            path,
            setErrors,
            createHotelSchema,
            errors,
        )
    }

    function handleSubmit(e) {
        e.preventDefault()
        try {
            createHotelSchema.validateSync(
                {
                    ...userCredentials,
                },
                {
                    strict: true,
                    abortEarly: false,
                },
            )
            signup()
        } catch (e) {
            if (e.inner) {
                e.inner.forEach(({ path, message }) => {
                    setErrors(prevState => ({
                        ...prevState,
                        [path]: [message],
                    }))
                })
            }
        }
    }

    function handleCompleted({ createHotel }) {
        if (createHotel) {
            setUser({ createAt: createHotel.createdAt })
            history.push('/dashboard')
        }
    }

    const ButtonWithLoader = withLoader(() => 'რეგისტრაცია')

    return (
        <>
            <form onSubmit={e => handleSubmit(e)} className="LoginForm">
                <Input
                    text="სახელი"
                    error={errors.name}
                    value={userCredentials.name}
                    onChange={e => handleChange(e, 'name')}
                    type="text"
                    id="name"
                    placeholder="სასტუმროს სახელი"
                />
                <Input
                    text="ელ-ფოსტა"
                    error={errors.email}
                    value={userCredentials.email}
                    onChange={e => handleChange(e, 'email')}
                    type="text"
                    id="email"
                    placeholder="შეიყვანეთ ელ-ფოსტა"
                />
                <Input
                    text="საკონტაქტო ტელეფონი"
                    error={errors.phone}
                    value={userCredentials.phone}
                    onChange={e => handleChange(e, 'phone')}
                    type="text"
                    id="phone"
                    placeholder="შეიყვანეთ ტელეფონი"
                />
                <Input
                    text="პაროლი"
                    error={errors.password}
                    value={userCredentials.password}
                    onChange={e => handleChange(e, 'password')}
                    type="password"
                    id="password"
                    placeholder="შეიყვანეთ პაროლი"
                />

                <button type="submit" className="button button--secondary">
                    <ButtonWithLoader isLoading={loading} />
                </button>
            </form>
            <button
                type="button"
                onKeyPress={e => {
                    if (e.which === 13) {
                        setIsLogin(true)
                    }
                }}
                onClick={() => setIsLogin(true)}
                className="button--transparent form-link"
            >
                შესვლა &rarr;
            </button>
        </>
    )
}

export default withRouter(SignupForm)
