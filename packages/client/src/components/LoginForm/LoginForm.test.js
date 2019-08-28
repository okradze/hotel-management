import { MockedProvider } from '@apollo/react-testing'
import { LoginForm } from './LoginForm'
import { LOGIN } from '../AuthPage/gql'

const mocks = [
    {
        request: {
            query: LOGIN,
            variables: { email: 'abc', password: 'abc' },
        },
        result: {
            data: {
                login: {
                    createdAt: '2019',
                },
            },
        },
    },
    {
        request: {
            query: LOGIN,
            variables: { email: 'abc123', password: 'abc123' },
        },
        error: new Error('no_user'),
    },
]

describe('LoginForm', () => {
    const setUser = jest.fn()

    jest.spyOn(React, 'useContext').mockImplementation(() => ({
        setUser,
    }))

    it('renders', () => {
        const wrapper = shallow(<LoginForm />)
        expect(wrapper).toMatchSnapshot()
    })

    describe('Login mutation', () => {
        let history, setIsLogin, preventDefault, wrapper

        jest.spyOn(React, 'useState').mockImplementation(() => [
            'abc',
            jest.fn(),
        ])

        beforeEach(() => {
            preventDefault = jest.fn()
            history = {
                push: jest.fn(),
            }
            setIsLogin = jest.fn()

            wrapper = mount(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <LoginForm history={history} setIsLogin={setIsLogin} />
                </MockedProvider>,
            )
        })
        afterEach(() => {
            jest.clearAllMocks()
        })

        it('on loading state', () => {
            wrapper.find('form').simulate('submit', { preventDefault })

            expect(preventDefault).toHaveBeenCalled()
            expect(wrapper.exists('.loader')).toEqual(true)
        })
        it('on error state', () => {
            jest.spyOn(React, 'useState').mockImplementation(() => [
                'abc123',
                jest.fn(),
            ])

            wrapper = mount(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <LoginForm history={history} setIsLogin={setIsLogin} />
                </MockedProvider>,
            )

            wrapper.find('form').simulate('submit', { preventDefault })

            setTimeout(() => {
                expect(preventDefault).toHaveBeenCalled()
                expect(wrapper.exists('.LoginForm__error')).toEqual(true)
            }, 0)
        })
        it('on completed state', () => {
            wrapper.find('form').simulate('submit', { preventDefault })

            setTimeout(() => {
                expect(preventDefault).toHaveBeenCalled()
                expect(setUser).toHaveBeenCalledWith({ createdAt: '2019' })
                expect(history.push).toHaveBeenCalled('/dashboard')
            }, 0)
        })
    })

    describe('calls function on', () => {
        let setState, wrapper

        beforeEach(() => {
            setState = jest.fn()
            jest.spyOn(React, 'useState').mockImplementation(init => [
                init,
                setState,
            ])
            wrapper = shallow(<LoginForm />)
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

        it('email change', () => {
            wrapper.find('#email').simulate('change', event)
            expect(setState).toHaveBeenCalledWith(event.target.value)
        })

        it('password change', () => {
            wrapper.find('#password').simulate('change', event)
            expect(setState).toHaveBeenCalledWith(event.target.value)
        })
    })

    describe('form changes on', () => {
        let setIsLogin, wrapper

        beforeEach(() => {
            setIsLogin = jest.fn()
            wrapper = shallow(<LoginForm setIsLogin={setIsLogin} />)
        })

        it('click', () => {
            wrapper.find('.form-link').simulate('click')
            expect(setIsLogin).toHaveBeenCalledWith(false)
        })
        it('keypress', () => {
            wrapper.find('.form-link').simulate('keypress', {
                which: 13,
            })
            expect(setIsLogin).toHaveBeenCalledWith(false)
        })
    })
})
