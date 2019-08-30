import React from 'react'
import PlusSvg from '../../svg/Plus'

const AutoCompleteInputPlusButton = ({ handleModalOpen }) => (
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
)

export default AutoCompleteInputPlusButton
