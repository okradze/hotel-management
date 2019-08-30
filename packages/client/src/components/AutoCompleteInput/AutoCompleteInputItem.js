import React from 'react'

const AutoCompleteInputItem = ({
    handleChoose,
    setIsOpen,
    item,
    renderItem,
}) => (
    <li className="AutoComplete__item">
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
)

export default AutoCompleteInputItem
