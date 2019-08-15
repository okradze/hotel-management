import React from 'react'

const Color = ({ currentColor, handleColorChoose }) => (
    <span
        role="button"
        tabIndex="0"
        onKeyPress={e => {
            if (e.which === 13) {
                handleColorChoose()
            }
        }}
        onClick={handleColorChoose}
        style={{
            backgroundColor: currentColor,
        }}
        className="ColorPicker__color"
    />
)

export default Color
