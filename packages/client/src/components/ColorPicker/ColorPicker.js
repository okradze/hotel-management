import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import Color from './Color'
import './ColorPicker.scss'

const ColorPicker = ({ colors, color, setColor }) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className="ColorPicker-wrapper">
            <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
                <div
                    role="button"
                    tabIndex="0"
                    onKeyPress={e => {
                        if (e.which === 13) {
                            setIsOpen(!isOpen)
                        }
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="ColorPicker-input"
                    style={{
                        backgroundColor: color,
                    }}
                />
                {isOpen && (
                    <div className="ColorPicker">
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
                )}
            </OutsideClickHandler>
        </div>
    )
}

export default ColorPicker
