import React from 'react'

const ColorPreviewButton = ({ setIsOpen, color }) => (
    <div
        role="button"
        tabIndex="0"
        onKeyPress={e => {
            if (e.which === 13) {
                setIsOpen(isOpen => !isOpen)
            }
        }}
        onClick={() => setIsOpen(isOpen => !isOpen)}
        className="ColorPicker-input"
        style={{
            backgroundColor: color,
        }}
    />
)
export default ColorPreviewButton
