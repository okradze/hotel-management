import { MockedProvider } from '@apollo/react-testing'
import { SignupForm } from './SignupForm'
import { SIGNUP } from '../AuthPage/gql'

const mocks = [
    {
        request: {
            query: SIGNUP,
            variables: {
                email: 'abc@gmail.com',
                phone: '555555555',
                name: 'Shcellar',
                password: 'password123',
            },
        },
        result: {
            data: {
                createHotel: {
                    createdAt: '2019',
                },
            },
        },
    },
    {
        request: {
            query: SIGNUP,
            variables: {
                email: 'abc@gmail.com',
                phone: '555555555',
                name: 'Shcellar',
                password: 'password123',
            },
        },
        error: new Error('no_user'),
    },
]

describe('SignupForm', () => {
    const setUser = jest.fn()

    jest.spyOn(React, 'useContext').mockImplementation(() => ({
        setUser,
    }))

    it('renders', () => {
        const wrapper = shallow(<SignupForm />)
        expect(wrapper).toMatchSnapshot()
    })

    describe('calls function on', () => {
        let setState, wrapper

        beforeEach(() => {
            setState = jest.fn()
            jest.spyOn(React, 'useState').mockImplementation(init => [
                init,
                setState,
            ])
            wrapper = shallow(<SignupForm />)
        })
        afterEach(() => {
            jest.clearAllMocks()
        })

        it('submit', () => {
            const event = { preventDefault: jest.fn() }
            wrapper.find('form').simulate('submit', event)
            expect(event.preventDefault).toHaveBeenCalled()
        })

        const event = {
            target: {
                value: 'abc',
            },
        }

        const initState = {
            name: '',
            email: '',
            phone: '',
            password: '',
        }

        it('name change', () => {
            wrapper.find('#name').simulate('change', event)
            expect(setState).toHaveBeenCalledWith({
                ...initState,
                name: event.target.value,
            })
        })

        it('phone change', () => {
            wrapper.find('#phone').simulate('change', event)
            expect(setState).toHaveBeenCalledWith({
                ...initState,
                phone: event.target.value,
            })
        })
        it('email change', () => {
            wrapper.find('#email').simulate('change', event)
            expect(setState).toHaveBeenCalledWith({
                ...initState,
                email: event.target.value,
            })
        })

        it('password change', () => {
            wrapper.find('#password').simulate('change', event)
            expect(setState).toHaveBeenCalledWith({
                ...initState,
                password: event.target.value,
            })
        })
    })

    describe('form changes on', () => {
        let setIsLogin, wrapper

        beforeEach(() => {
            setIsLogin = jest.fn()
            wrapper = shallow(<SignupForm setIsLogin={setIsLogin} />)
        })

        it('click', () => {
            wrapper.find('.form-link').simulate('click')
            expect(setIsLogin).toHaveBeenCalledWith(true)
        })
        it('keypress', () => {
            wrapper.find('.form-link').simulate('keypress', {
                which: 13,
            })
            expect(setIsLogin).toHaveBeenCalledWith(true)
        })
    })
})
