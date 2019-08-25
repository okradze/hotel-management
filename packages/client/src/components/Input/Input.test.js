import Input from './Input'

let value, onChange, id, type, error, text, wrapper

beforeEach(() => {
    value = ''
    onChange = jest.fn().mockImplementation(({ target }) => {
        value = target.value
    })
    text = 'Email'
    id = 'email'
    type = 'email'
    error = ''
    wrapper = shallow(
        <Input
            value={value}
            onChange={onChange}
            id={id}
            type={type}
            error={error}
            text={text}
        />,
    )
})

describe('Input', () => {
    it('renders', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('renders with error', () => {
        const errorText = 'Email is not valid'
        wrapper.setProps({ error: errorText })
        expect(wrapper.find('p').text()).toEqual(errorText)
        expect(wrapper).toMatchSnapshot()
    })

    it('calls function on onChange', () => {
        const inputValue = 'abc'
        const event = {
            target: {
                value: inputValue,
            },
        }
        wrapper.find('input').simulate('change', event)
        expect(onChange).toHaveBeenCalledWith(event)
        expect(value).toEqual(inputValue)
    })
})
