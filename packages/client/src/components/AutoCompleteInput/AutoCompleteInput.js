import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import './AutoCompleteInput.scss'
import PlusSvg from '../../svg/Plus'
import Loader from '../Loader'

const AutoCompleteInput = ({
    setValue,
    value,
    placeholder,
    data,
    handleChange,
    loading,
    handleModalOpen,
    handleChoose,
    renderItem,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                setIsOpen(false)
            }}
        >
            <div className="AutoCompleteInput">
                <input
                    value={value}
                    className="AutoCompleteInput__input"
                    onChange={e => {
                        setValue(e.target.value)
                        setIsOpen(true)
                        handleChange(e.target.value)
                    }}
                    type="text"
                    placeholder={placeholder}
                />
                <span
                    tabIndex="0"
                    role="button"
                    onKeyPress={e => {
                        if (e.which === 13) {
                            handleModalOpen()
                        }
                    }}
                    onClick={handleModalOpen}
                    className="AutoCompleteInput__plus-wrapper"
                >
                    <PlusSvg className="AutoCompleteInput__plus" />
                </span>
                {isOpen && (
                    <ul className="AutoComplete">
                        {loading ? (
                            <li className="AutoComplete__loading">
                                <Loader />
                            </li>
                        ) : (
                            data.map((item, index) => (
                                <li className="AutoComplete__item" key={index}>
                                    <span
                                        role="button"
                                        onKeyPress={e => {
                                            if (e.which === 13) {
                                                handleChoose(item)
                                                setIsOpen(false)
                                            }
                                        }}
                                        tabIndex="0"
                                        onClick={() => {
                                            handleChoose(item)
                                            setIsOpen(false)
                                        }}
                                        className="AutoComplete__button"
                                    >
                                        {renderItem(item)}
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
        </OutsideClickHandler>
    )
}

export default AutoCompleteInput
