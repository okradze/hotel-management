import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

const Select = ({ setValue, options, value }) => {
    const [isOpen, setIsOpen] = useState(false)

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
                                <li key={index} className="select__item">
                                    <button
                                        onKeyPress={e => {
                                            if (e.which === 13) {
                                                setValue({ ...value, text })
                                                setIsOpen(false)
                                            }
                                        }}
                                        onClick={() => {
                                            setValue({ ...value, text })
                                            setIsOpen(false)
                                        }}
                                        className="button--transparent"
                                        type="button"
                                    >
                                        {text}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </OutsideClickHandler>
        </div>
    )
}

export default Select
