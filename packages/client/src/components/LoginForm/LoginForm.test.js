import { LoginForm } from './LoginForm'
import { Context } from '../../context/AuthContext'

let history
let setIsLogin
let wrapper

beforeEach(() => {
    history = {
        push: jest.fn(),
    }
    setIsLogin = jest.fn()
    wrapper = shallow(
        <Context.Provider
            value={{
                setIsUser: jest.fn(),
            }}
        >
            <LoginForm history={history} setIsLogin={setIsLogin} />
        </Context.Provider>,
    )
})

describe('LoginForm', () => {
    it('renders', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
