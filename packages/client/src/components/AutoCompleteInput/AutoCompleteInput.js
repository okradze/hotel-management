import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import AutoCompleteInputItemOverview from './AutoCompleteInputItemOverview'
import AutoCompleteInputPlusButton from './AutoCompleteInputPlusButton'
import withLoader from '../Loader'
import './AutoCompleteInput.scss'

const AutoCompleteInput = ({
    setValue,
    value,
    placeholder,
    data,
    handleChange,
    handleChoose,
    renderItem,
    handleModalOpen,
    loading,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleInputChange = e => {
        setValue(e.target.value)
        setIsOpen(true)
        handleChange(e.target.value)
    }

    const AutoCompleteWithLoader = withLoader(() => (
        <AutoCompleteInputItemOverview
            handleChoose={handleChoose}
            renderItem={renderItem}
            data={data}
        />
    ))

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
                    onChange={handleInputChange}
                    type="text"
                    placeholder={placeholder}
                />
                <AutoCompleteInputPlusButton
                    handleModalOpen={handleModalOpen}
                />
                {isOpen && (
                    <ul className="AutoComplete">
                        <AutoCompleteWithLoader
                            styles={{
                                padding: '10px 0',
                            }}
                            isLoading={loading}
                        />
                    </ul>
                )}
            </div>
        </OutsideClickHandler>
    )
}

export default AutoCompleteInput
