import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import './AutoCompleteInput.scss'
import PlusSvg from '../../svg/Plus'
import withLoader from '../Loader'

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

    const AutoCompleteWithLoader = withLoader(({ data }) =>
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
        )),
    )

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
                        <AutoCompleteWithLoader
                            styles={{
                                padding: '10px 0',
                            }}
                            isLoading={loading}
                            data={data}
                        />
                    </ul>
                )}
            </div>
        </OutsideClickHandler>
    )
}

export default AutoCompleteInput
