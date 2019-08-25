import Select from './Select'

describe('Select', () => {
    let wrapper

    const setIsOpen = jest.fn()
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation(init => [init, setIsOpen])

    const options = [
        {
            text: '1',
            value: '1',
        },
        {
            text: '2',
            value: '2',
        },
    ]

    beforeEach(() => {
        wrapper = shallow(
            <Select
                value={options[0].text}
                options={options}
                setValue={(text, value) => setValue(text, value)}
            />,
        )
    })

    it('renders when closed', () => {
        expect(wrapper).toMatchSnapshot()
    })
    it('renders when is open', () => {
        wrapper.find('button').simulate('click')

        expect(setIsOpen).toHaveBeenCalledWith(true)
        expect(wrapper).toMatchSnapshot()
    })
})
