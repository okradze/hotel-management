import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'
import { createHotelSchema } from '@hb/common'
import { Context } from '../../context/AuthContext'
import withLoader from '../Loader/Loader'
import { SIGNUP } from '../LoginPage/gql'
import './LoginPage.scss'
import handleValidate from '../../utils/handleValidate'
import Input from '../Input/Input'

const SignupForm = ({ history, setIsLogin }) => {
    const { setUser } = useContext(Context)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    })

    const [signup, { loading }] = useMutation(SIGNUP, {
        variables: {
            name,
            email,
            phone,
            password,
        },
        onCompleted: handleCompleted,
    })

    function handleNameChange(e) {
        handleValidate(
            e.target.value,
            setName,
            'name',
            setErrors,
            createHotelSchema,
            errors,
        )
    }
    function handleEmailChange(e) {
        handleValidate(
            e.target.value,
            setEmail,
            'email',
            setErrors,
            createHotelSchema,
            errors,
        )
    }
    function handlePasswordChange(e) {
        handleValidate(
            e.target.value,
            setPassword,
            'password',
            setErrors,
            createHotelSchema,
            errors,
        )
    }
    function handlePhoneChange(e) {
        handleValidate(
            e.target.value,
            setPhone,
            'phone',
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
                    name,
                    email,
                    phone,
                    password,
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
        <div className="LoginPage-wrapper">
            <div className="LoginPage-form">
                <form
                    onSubmit={e => handleSubmit(e, signup)}
                    className="LoginForm"
                >
                    <Input
                        text="სახელი"
                        error={errors.name}
                        value={name}
                        onChange={handleNameChange}
                        type="text"
                        id="name"
                    />
                    <Input
                        text="ელ-ფოსტა:"
                        error={errors.email}
                        value={email}
                        onChange={handleEmailChange}
                        type="text"
                        id="email"
                    />
                    <Input
                        text="საკონტაქტო ტელეფონი:"
                        error={errors.phone}
                        value={phone}
                        onChange={handlePhoneChange}
                        type="text"
                        id="phone"
                    />
                    <Input
                        text="პაროლი:"
                        error={errors.password}
                        value={password}
                        onChange={handlePasswordChange}
                        type="password"
                        id="password"
                    />

                    <button type="submit" className="button button--secondary">
                        <ButtonWithLoader isLoading={loading} />
                    </button>
                </form>
                <div>
                    <p
                        role="link"
                        tabIndex="0"
                        onKeyPress={e => {
                            if (e.which === 13) {
                                setIsLogin(true)
                            }
                        }}
                        onClick={() => setIsLogin(true)}
                        className="form-link"
                    >
                        შესვლა
                    </p>
                </div>
            </div>
        </div>
    )
}

export default withRouter(SignupForm)
