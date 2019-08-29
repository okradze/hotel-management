import React from 'react'

const SelectItem = ({ setIsOpen, setValue, text, value }) => (
    <li className="select__item">
        <button
            onKeyPress={e => {
                if (e.which === 13) {
                    setValue(text, value)
                    setIsOpen(false)
                }
            }}
            onClick={() => {
                setValue(text, value)
                setIsOpen(false)
            }}
            className="button--transparent"
            type="button"
        >
            {text}
        </button>
    </li>
)

export default SelectItem
