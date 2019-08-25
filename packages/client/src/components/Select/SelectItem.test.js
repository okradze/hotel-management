import SelectItem from './SelectItem'

describe('SelectItem', () => {
    let wrapper, setIsOpen, setValue, text, value

    beforeEach(() => {
        setIsOpen = jest.fn()
        setValue = jest.fn()
        text = 'abc'
        value = 'abc123'
        wrapper = shallow(
            <SelectItem
                setIsOpen={setIsOpen}
                setValue={setValue}
                text={text}
                value={value}
            />,
        )
    })
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders', () => {
        expect(wrapper).toMatchSnapshot()
    })

    describe('calls setValue and setIsOpen on', () => {
        it('click', () => {
            wrapper.find('button').simulate('click')
            expect(setValue).toHaveBeenCalledWith(text, value)
            expect(setIsOpen).toHaveBeenCalledWith(false)
        })

        it('keypress', () => {
            wrapper.find('button').simulate('keypress', {
                which: 13,
            })
            expect(setValue).toHaveBeenCalledWith(text, value)
            expect(setIsOpen).toHaveBeenCalledWith(false)
        })
    })
})
