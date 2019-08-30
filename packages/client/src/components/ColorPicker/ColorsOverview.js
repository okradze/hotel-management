import React from 'react'
import Color from './Color'

const ColorsOverview = ({ setIsOpen, setColor, colors }) => {
    return (
        <div className="ColorPicker-overview">
            {colors.map((currentColor, index) => (
                <Color
                    currentColor={currentColor}
                    handleColorChoose={() => {
                        setColor(currentColor)
                        setIsOpen(false)
                    }}
                    key={index}
                />
            ))}
        </div>
    )
}

export default ColorsOverview
