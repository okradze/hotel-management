import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import SelectItem from './SelectItem'

const Select = ({ setValue, options, value }) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className="select">
            <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="select__button"
                >
                    <span>{value}</span>
                </button>
                {isOpen && (
                    <div className="select__list-wrapper">
                        <ul className="select__list">
                            {options.map(({ text, value }, index) => (
                                <SelectItem
                                    key={index}
                                    text={text}
                                    value={value}
                                    setIsOpen={setIsOpen}
                                    setValue={setValue}
                                />
                            ))}
                        </ul>
                    </div>
                )}
            </OutsideClickHandler>
        </div>
    )
}

export default Select
