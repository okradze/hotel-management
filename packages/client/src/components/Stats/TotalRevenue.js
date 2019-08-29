import React from 'react'

const TotalRevenue = ({ data }) => (
    <div className="TotalRevenue">
        <h3 className="TotalGuests__heading">{data}ლ</h3>
        <p className="TotalGuests__text">შემოსავალი</p>
    </div>
)

export default TotalRevenue
