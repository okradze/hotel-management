import React from 'react'

const TotalComponent = ({ data, text, className = '' }) => (
    <div className={`TotalComponent ${className}`}>
        <h3 className="TotalComponent__heading">{data}</h3>
        <p className="TotalComponent__text">{text}</p>
    </div>
)

export default TotalComponent
