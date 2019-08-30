import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import ColorsOverview from './ColorsOverview'
import ColorPreviewButton from './ColorPreviewButton'
import './ColorPicker.scss'

const ColorPicker = ({ colors, color, setColor }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="ColorPicker">
            <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
                <ColorPreviewButton setIsOpen={setIsOpen} color={color} />
                {isOpen && (
                    <ColorsOverview
                        setIsOpen={setIsOpen}
                        colors={colors}
                        setColor={setColor}
                    />
                )}
            </OutsideClickHandler>
        </div>
    )
}

export default ColorPicker
